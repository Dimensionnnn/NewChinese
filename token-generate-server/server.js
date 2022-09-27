const express = require("express");
const app = express();
const { MeiliSearch } = require("meilisearch");
const nodejieba = require("nodejieba");

app.use((request, response, next) => {
  console.log("有人请求服务器1了");
  console.log("请求来自于", request.get("Host"));
  console.log("请求的地址", request.url);
  console.log("userid", request.query.userid);
  next();
});

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

app.get("/fenci", (request, response) => {
  //console.log("fenci_str", request.query.fenci_str);
  let fenci = nodejieba.cut(request.query.fenci_str);
  response.send(fenci);
  // let zishu_num = 100;
  // let ci_num = 100;
  // const client = new MeiliSearch({
  //   host: "http://10.24.0.60:7700",
  //   apiKey: "MASTER_KEY",
  // });
  // let zishu_hsk = {
  //   一级: 0,
  //   二级: 0,
  //   三级: 0,
  //   四级: 0,
  //   五级: 0,
  //   六级: 0,
  //   高等: 0,
  //   未录入: 0,
  // };
  // let zishu_hsk_rate = {
  //   一级: 0,
  //   二级: 0,
  //   三级: 0,
  //   四级: 0,
  //   五级: 0,
  //   六级: 0,
  //   高等: 0,
  //   未录入: 0,
  // };
  // let zishu_369 = {
  //   一级: 0,
  //   二级: 0,
  //   三级: 0,
  //   四级: 0,
  //   五级: 0,
  //   六级: 0,
  //   高等: 0,
  //   未录入: 0,
  // };
  // let zishu_369_rate = {
  //   一级: 0,
  //   二级: 0,
  //   三级: 0,
  //   四级: 0,
  //   五级: 0,
  //   六级: 0,
  //   高等: 0,
  //   未录入: 0,
  // };
  // let ci_hsk = {
  //   一级: 0,
  //   二级: 0,
  //   三级: 0,
  //   四级: 0,
  //   五级: 0,
  //   六级: 0,
  //   高等: 0,
  //   未录入: 0,
  // };
  // let ci_hsk_rate = {
  //   一级: 0,
  //   二级: 0,
  //   三级: 0,
  //   四级: 0,
  //   五级: 0,
  //   六级: 0,
  //   高等: 0,
  //   未录入: 0,
  // };
  // let ci_369 = {
  //   一级: 0,
  //   二级: 0,
  //   三级: 0,
  //   四级: 0,
  //   五级: 0,
  //   六级: 0,
  //   高等: 0,
  //   未录入: 0,
  // };
  // let ci_369_rate = {
  //   一级: 0,
  //   二级: 0,
  //   三级: 0,
  //   四级: 0,
  //   五级: 0,
  //   六级: 0,
  //   高等: 0,
  //   未录入: 0,
  // };
  // console.log("fenci111", fenci);
  // for (let q of fenci) {
  //   client
  //     .index("HSK_utf8_id_space")
  //     .search(q)
  //     .then((res) => {
  //       //console.log("HSK_res", res.hits.length !== 0 ? res.hits[0].HSK级别 : "无结果");
  //       // console.log("hitss", res.hits);
  //       if (res.hits.length !== 0) {
  //         zishu_hsk[res.hits[0].HSK级别]++;
  //         zishu_hsk_rate[res.hits[0].HSK级别] = (
  //           zishu_hsk[res.hits[0].HSK级别] / zishu_num
  //         ).toFixed(2);
  //         console.log("zishu_internal", zishu_hsk);
  //       } else {
  //         zishu_hsk["未录入"]++;
  //         zishu_hsk_rate["未录入"] = (zishu_hsk["未录入"] / zishu_num).toFixed(
  //           2
  //         );
  //       }
  //       response.send(zishu_hsk);
  //     });

  //   client
  //     .index("words_3d9j_space0")
  //     .search(q)
  //     .then((res) => {
  //       //console.log("words_3d9j_space0_res", res.hits.length !== 0 ? res.hits[0].等级 : "无结果");
  //       if (res.hits.length !== 0) {
  //         zishu_369[res.hits[0].等级]++;
  //         zishu_369_rate[res.hits[0].等级] = (
  //           zishu_369[res.hits[0].等级] / zishu_num
  //         ).toFixed(2);
  //       } else {
  //         zishu_369["未录入"]++;
  //         zishu_369_rate["未录入"] = (zishu_369["未录入"] / zishu_num).toFixed(
  //           2
  //         );
  //       }
  //     });
  // }
  // for (let q of fenci) {
  //   client
  //     .index("HSK_utf8_id_space")
  //     .search(q)
  //     .then((res) => {
  //       //console.log("HSK_res", res.hits.length !== 0 ? res.hits[0].HSK级别 : "无结果");
  //       if (res.hits.length !== 0) {
  //         ci_hsk[res.hits[0].HSK级别]++;
  //         ci_hsk_rate[res.hits[0].HSK级别] = (
  //           ci_hsk[res.hits[0].HSK级别] / ci_num
  //         ).toFixed(2);
  //       } else {
  //         ci_hsk["未录入"]++;
  //         ci_hsk_rate["未录入"] = (ci_hsk["未录入"] / ci_num).toFixed(2);
  //       }
  //     });

  //   client
  //     .index("words_3d9j_space0")
  //     .search(q)
  //     .then((res) => {
  //       //console.log("words_3d9j_space0_res", res.hits.length !== 0 ? res.hits[0].等级 : "无结果");
  //       if (res.hits.length !== 0) {
  //         ci_369[res.hits[0].等级]++;
  //         ci_369_rate[res.hits[0].等级] = (
  //           ci_369[res.hits[0].等级] / ci_num
  //         ).toFixed(2);
  //       } else {
  //         ci_369["未录入"]++;
  //         ci_369_rate["未录入"] = (ci_369["未录入"] / ci_num).toFixed(2);
  //       }
  //     });
  // }
  // //合并为对象数组
  // // let zi_arr = [...zishu_hsk, ...zishu_hsk_rate];
  // let zi_arr369 = [zishu_369, zishu_369_rate];

  // let ci_arr = [ci_hsk, ci_hsk_rate];
  // let ci_arr369 = [ci_369, ci_369_rate];

  // console.log("zishu_outer", zishu_hsk);
});

app.listen(5001, "0.0.0.0", (err) => {
  if (!err)
    console.log(
      "服务器1启动成功了,请求tenantToken地址为：http://0.0.0.0:5001/newTenantToken"
    );
});
