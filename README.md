# NewChinese
新中文教育项目，结合meilisearch&amp;tinymce，后端rust+前端react

搜索引擎项目地址
https://github.com/meilisearch/meilisearch

文本编辑器项目地址
https://github.com/tinymce/tinymce
## 8.18-8.25
1. 省略跳出界面，文本统计信息一直保留，细化编辑界面
2. 分词结果作为索引，建立文档索引，生词库直接用字符匹配，研究一下~更改倒排索引的方式
3. 点击分析文本直接跳到编辑界面，有统计信息的界面，取消原来的查看界面，直接在编辑界面设置只读，点击编辑之后才可以编辑
4. 检索结果里userid可以不展示
5.通过公有化申请放在浏览界面里，加一个审核通过，或者审核不通过，（这里可能需要加一些提示消息，待考虑）
6.重复内容比对问题，背后字符串存储不同。

更新Log：每周更新issue
## 本周milestone：6.29-7.6
完成项目合并、搭建初步权限系统、完善编辑器功能、优化搜索界面ui

## milestone：6.22-6.28
完成跳转、权限系统调研、高级搜索完善。


## milestone: 6.16-6.21
完成tinymce转换为react框架，meilisearch高级搜索基础界面。
