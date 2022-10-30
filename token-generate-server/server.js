const express = require("express");
const app = express();
const { MeiliSearch } = require("meilisearch");
const nodejieba = require("nodejieba");
const HashMap = require("hashmap");
const fs = require("fs");
const bodyParser = require("body-parser");
const axios = require("axios");

var word_dic = new HashMap();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((request, response, next) => {
  console.log("有人请求服务器1了");
  console.log("请求来自于", request.get("Host"));
  console.log("请求的地址", request.url);
  // console.log("userid", request.query.userid);
  next();
});

function generateNewAnalyzeData() {
  return {
    _HSK: {
      一级: [],
      二级: [],
      三级: [],
      四级: [],
      五级: [],
      六级: [],
      高等: [],
      未录入: [],
    },
    _369: {
      一级: [],
      二级: [],
      三级: [],
      四级: [],
      五级: [],
      六级: [],
      高等: [],
      未录入: [],
    },
  };
}

app.get("/newTenantToken", (request, response) => {
  console.log("userid", request.query.userid);
  let searchRules = "";
  if (request.query.userid === "MTcwXzI") {
    console.log("管理员用户");
    searchRules = {
      all_private: {
        filter: `userid = ${request.query.userid} OR userid = admin`,
      },
      wait_to_submit: {
        filter: `userid = ${request.query.userid} OR userid = admin`,
      },
      "*": {},
    };
  } else if (request.query.userid === "") {
    console.log("未登录用户");
    searchRules = {
      "*": {
        // filter: `userid = ${request.query.userid}`
      },
      all_private: {
        filter: `userid = x`,
      },
      wait_to_check: {
        filter: `userid = x`,
      },
      wait_to_submit: {
        filter: `userid = x`,
      },
    };
  } else {
    console.log("普通用户");
    searchRules = {
      all_private: {
        filter: `userid = ${request.query.userid}`,
      },
      wait_to_check: {
        filter: `userid = ${request.query.userid}`,
      },
      wait_to_submit: {
        filter: `userid = ${request.query.userid}`,
      },
      "*": {},
    };
  }
  //使用default search apikey：对所有索引有且仅有search操作权限
  const apiKey = "18d85086-6e6e-4405-bc44-c27ba5efe720";
  const expiresAt = new Date("2025-12-20"); // optional
  const client = new MeiliSearch({
    host: "http://10.24.0.60:7700",
    apiKey: "MASTER_KEY",
  });
  const token = client.generateTenantToken(apiKey, searchRules, {
    apiKey: "2b15e0f3821be95ee5cbccc8cdc502aa4395f7ebc1cfe5a65a95f63ea6b724b4",
    expiresAt: expiresAt,
  });
  console.log(token);
  const frontEndClient = new MeiliSearch({
    host: "http://10.24.0.60:7700",
    apiKey: token,
  });
  const data = frontEndClient.index("all_private").search();
  console.log(data);
  response.send(token);
});

function getApiKey(roles, userid) {
  let mx_role = 4;
  for (let _ind in roles) {
    if (roles[_ind] === "root") {
      mx_role = mx_role > 1 ? 1 : mx_role;
    }
    if (roles[_ind] === "admin") {
      mx_role = mx_role > 2 ? 2 : mx_role;
    }
    if (roles[_ind] === "common") {
      mx_role = mx_role > 3 ? 3 : mx_role;
    }
  }
  if (mx_role == 1 || mx_role == 2) {
    return generateApiKey(generateSearchRules(1, userid));
  } else if (mx_role == 3) {
    return generateApiKey(generateSearchRules(3, userid));
  } else {
    return generateApiKey(generateSearchRules(-1, userid));
  }
}

function generateSearchRules(role, userid) {
  switch (role) {
    case 1: {
      // 管理员
      return {
        all_private: {
          filter: `userid = ${userid} OR userid = admin`,
        },
        wait_to_submit: {
          filter: `userid = ${userid} OR userid = admin`,
        },
        "*": {},
      };
    }
    case 3: {
      return {
        all_private: {
          filter: `userid = ${userid}`,
        },
        wait_to_check: {
          filter: `userid = ${userid}`,
        },
        wait_to_submit: {
          filter: `userid = ${userid}`,
        },
        "*": {},
      };
    }
    case -1: {
      return {
        "*": {
          // filter: `userid = ${request.query.userid}`
        },
        all_private: {
          filter: `userid = x`,
        },
        wait_to_check: {
          filter: `userid = x`,
        },
        wait_to_submit: {
          filter: `userid = x`,
        },
      };
    }
  }
}

function generateApiKey(searchRules) {
  console.log(searchRules);
  const apiKey = "18d85086-6e6e-4405-bc44-c27ba5efe720";
  const expiresAt = new Date("2025-12-20"); // optional
  const client = new MeiliSearch({
    host: "http://10.24.0.60:7700",
    apiKey: "MASTER_KEY",
  });
  const token = client.generateTenantToken(apiKey, searchRules, {
    apiKey: "2b15e0f3821be95ee5cbccc8cdc502aa4395f7ebc1cfe5a65a95f63ea6b724b4",
    expiresAt: expiresAt,
  });
  return token;
}

app.get("/newTenantToken_dev", (request, response) => {
  let token = request.query.usertoken;
  if (!token) {
    let res_data = getApiKey([]);
    response.send(JSON.stringify(res_data));
    return;
  }
  let res = "";
  axios({
    method: "post",
    url: "http://127.0.0.1:8888/api/open/userinfo",
    data: {},
    headers: { "Access-Token": token },
  })
    .then((data) => {
      let json_data = data.data.data;
      let res_data = getApiKey(json_data.role, json_data.userid);
      // console.log("debug");
      // console.log(json_data);
      // console.log(res_data);
      response.send(JSON.stringify(res_data));
    })
    .catch((err) => {
      let res_data = getApiKey([], -1);
      response.send(JSON.stringify(res_data));
    });
});

function fenci(article) {
  return nodejieba.cut(article);
}

app.get("/fenci", (request, response) => {
  let fenci = response.send(request.query.fenci_str);
});

function divideWords(words) {
  let res_data = generateNewAnalyzeData();
  for (let _ind in words) {
    if (!isChinese(words[_ind])) continue;
    word_info = word_dic.get(words[_ind]);
    if (!word_info) {
      res_data._369.未录入.push(words[_ind]);
      res_data._HSK.未录入.push(words[_ind]);
    } else {
      if (word_info["369"] !== "None") {
        res_data._369[word_info["369"]].push(words[_ind]);
      } else {
        res_data._369.未录入.push(words[_ind]);
      }
      if (word_info["hsk"] !== "None") {
        res_data._HSK[word_info["hsk"]].push(words[_ind]);
      } else {
        res_data._HSK.未录入.push(words[_ind]);
      }
    }
  }
  return res_data;
}

function getCharacters(article) {
  let res_data = [];
  for (let _ind in article) {
    res_data.push(article[_ind]);
  }
  return res_data;
}

function isChinese(str) {
  var filter = /[\u4E00-\u9FA5\uF900-\uFA2D]{1,}/;
  return filter.test(str);
}

app.post("/analyze", (request, response) => {
  // console.log(request.body);
  if (!request.body["article"]) {
    response.send("para error");
    return;
  }
  let article = request.body["article"];
  let res_data = {
    words: divideWords(fenci(article)),
    characters: divideWords(getCharacters(article)),
  };
  // console.log(article);
  response.send(JSON.stringify(res_data));
});

app.listen(5001, "0.0.0.0", (err) => {
  sta = (function () {
    var data = fs.readFileSync(
      "/home/ubuntu/NewChinese/token-generate-server/word_dict.json",
      "utf-8"
    );
    words = JSON.parse(data);
    for (let _ind in words) {
      var _it = { 369: words[_ind]["369"], hsk: words[_ind]["hsk"] };
      word_dic.set(words[_ind]["word"], _it);
    }
    return true;
  })();
  console.log(sta ? "词库读取成功" : "词库读取失败");
  if (!err)
    console.log(
      "服务器1启动成功了,请求tenantToken地址为：http://0.0.0.0:5001/newTenantToken"
    );
});
