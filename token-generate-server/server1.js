const express = require('express')
const app = express()
const { MeiliSearch } = require('meilisearch')

app.use((request, response, next) => {
	console.log('有人请求服务器1了');
	console.log('请求来自于', request.get('Host'));
	console.log('请求的地址', request.url);
	next()
})

app.get('/newTenantToken', (request, response) => {
	console.log(request.query.userid)
	let searchRules = ''
	if(request.query.userid === "admin"){
		searchRules = {
			all_private: {
				filter: `userid = ${request.query.userid}`
			},
			"*":{
	
			}
		}
	}else{
		searchRules = {
			all_private: {
				filter: `userid = ${request.query.userid}`
			},
			doc_wiki_05:{
	
			},
			"*":{
				filter: `userid = ${request.query.userid}`
			}
		}
	}
	
	
	//使用default search apikey：对所有索引有且仅有search操作权限
	const apiKey = '18d85086-6e6e-4405-bc44-c27ba5efe720'
	const expiresAt = new Date('2025-12-20') // optional
	const client = new MeiliSearch({ host: "http://127.0.0.1:7700", apiKey: "MASTER_KEY" });
	const token = client.generateTenantToken(apiKey,searchRules, {
		apiKey: '2b15e0f3821be95ee5cbccc8cdc502aa4395f7ebc1cfe5a65a95f63ea6b724b4',
		expiresAt: expiresAt,
	})
	console.log(token)
	const frontEndClient = new MeiliSearch({ host: 'http://127.0.0.1:7700', apiKey: token })
	const data = frontEndClient.index('all_private').search()
	console.log(data)
	response.send(token)
})

app.listen(5001, (err) => {
	if (!err) console.log('服务器1启动成功了,请求tenantToken地址为：http://localhost:5001/newTenantToken');
})
