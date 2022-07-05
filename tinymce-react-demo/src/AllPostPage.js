import React from 'react';

import { CSVLink } from "react-csv";
import 'element-theme-default';
import { Table } from 'element-react';
// const headers = [
//         { label: "First Name", key: "firstname" },
//         { label: "Last Name", key: "lastname" },
//         { label: "Email", key: "email" }
//     ]

// const data = [
//     ["firstname", "lastname", "email"],
//     ["Ahmed", "Tomi", "ah@smthing.co.com"],
//     ["Raed", "Labes", "rl@smthing.co.com"],
//     ["Yezzi", "Min l3b", "ymin@cocococo.com"]
//     ];

class AllPostPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    label: "级别",
                    prop: "rank",
                    width: "70px",
                    height:"25px"
                },
                {
                    label: "1",
                    prop: "rank_1",
                    width: "55px",
                    height: "25px",
                    
                },
                {
                    label: "2",
                    prop: "rank_2",
                    width: "55px",
                    height: "25px"
                },
                {
                    label: "3",
                    prop: "rank_3",
                    width: "55px",
                    height: "25px"
                },
                {
                    label: "4",
                    prop: "rank_4",
                    width: "55px",
                    height: "25px"
                },
                {
                    label: "5",
                    prop: "rank_5",
                    width: "55px",
                    height: "25px"
                },
                {
                    label: "6",
                    prop: "rank_6",
                    width: "55px",
                    height: "25px"
                },
                {
                    label: "7",
                    prop: "rank_7",
                    width: "55px",
                    height: "25px"
                },
                {
                    label: "8",
                    prop: "rank_8",
                    width: "55px",
                    height: "25px"
                },
                {
                    label: "9",
                    prop: "rank_9",
                    width: "55px",
                    height: "25px"
                },
                {
                    label: "未录入",
                    prop: "no_rank",
                    width: "80px",
                    height: "25px"
                }
            ],
            // data: [{
            //     date: '2016-05-02',
            //     name: '王小虎',
            //     address: '上海市普陀区金沙江路 1518 弄'
            // }, {
            //     date: '2016-05-04',
            //     name: '王小虎',
            //     address: '上海市普陀区金沙江路 1517 弄'
            // }, {
            //     date: '2016-05-01',
            //     name: '王小虎',
            //     address: '上海市普陀区金沙江路 1519 弄'
            // }, {
            //     date: '2016-05-03',
            //     name: '王小虎',
            //     address: '上海市普陀区金沙江路 1516 弄'
            // }]
        }
        const log = () => {
            alert('被点击了');
        }
    }
    

    render() {
        return <div >
            <p>总字数：300；
            等级大纲字数/%:50%</p>
            <Table
                style={{ width: '100%' }}
                columns={this.state.columns}
                data={this.props.tableData1}
                border={true}
                
                // onHeaderClick={("rank_6", () => {
                //     alert('被点击了');
                // })}

            />

            <div>
                <CSVLink data={this.props.csvData1} >
                    下载统计信息
                </CSVLink>

            </div>
            <p>总词数：50；
                等级大纲词数/%:88%</p>
            <Table
                style={{ width: '100%' }}
                columns={this.state.columns}
                data={this.props.tableData2}
                border={true}
                // onCellClick={((1,2) ,() => {
                //     alert('被点击了');
                // })}

            />
          
            <div>
                <CSVLink data={this.props.csvData2} >
                    下载统计信息    
                </CSVLink>

            </div>
            
        </div>
    }
}

export default AllPostPage;