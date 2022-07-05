import React from 'react';
class DataToTable extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            str1: this.writeToTable1(),
            str2: this.writeToTable2()
        }
    const fontStlye = {
        border: '1px solid blueviolet'
    }
    this.writeToTable1 = this.writeToTable1.bind(this);
    this.writeToTable2 = this.writeToTable2.bind(this);
}
    writeToTable1 = () => {
        var arr = [
            ['字数', '10', '20', '30', '40', '50', '60', '70', '80', '90','未录入',],
            ['占比', '8%', '8%', '8%', '8%', '8%', '8%', '8%', '8%', '8%','9%'],
            
        ];
        // 定义变量,存储生成的字符串内容,使用 += 拼接字符串形式
        var strr = '';
        //外层循环,生成tr
        for (var i = 0; i <= arr.length - 1; i++) {
            // 外层循环生成tr标签,循环几次,就生成几个tr标签
            // 因为tr标签中还要有td内容,要将两个tr标签,分开,写成拼接的形式
            strr += '<tr>';

            // 第一个单元格是单独生成的,不参与内层循环,是 当前 外层循环 索引下标+1
            // strr += `<td>${i + 1}</td>`;

            //当前行,对应的二维数组，循环的对象是 arr[i] , 
            //生成 arr[i] 的所有的索引下标，通过索引下标,获取对应的数据。
            // 起始数值是0 终止数值是 arr[i]的最大索引下标，arr[i]的length-1
            for (var j = 0; j <= arr[i].length - 1; j++) {
                // 每一个单元的内容,就是当前二维数组单元的数据内容
                // 获取二维数组, 数组变量[一维索引][二维索引] 一维索引是i 二维索引是j
                strr += `<td>${arr[i][j]}</td>`;
            }
            strr += '</tr>';
        }
        // 将定义好的内容,写入到taody标签中
        // contain.innerHTML = str;
        return strr
    }
    writeToTable2 = () => {
        var arr = [
            ['词数', '11', '22', '33', '44', '55', '65', '75', '85', '9', '未录入',],
            ['占比', '9%', '9%', '9%', '9%', '9%', '9%', '20%', '23%', '18%', '55%'],

        ];
        // 定义变量,存储生成的字符串内容,使用 += 拼接字符串形式
        var strr = '';
        //外层循环,生成tr
        for (var i = 0; i <= arr.length - 1; i++) {
            // 外层循环生成tr标签,循环几次,就生成几个tr标签
            // 因为tr标签中还要有td内容,要将两个tr标签,分开,写成拼接的形式
            strr += '<tr>';

            // 第一个单元格是单独生成的,不参与内层循环,是 当前 外层循环 索引下标+1
            // strr += `<td>${i + 1}</td>`;

            //当前行,对应的二维数组，循环的对象是 arr[i] , 
            //生成 arr[i] 的所有的索引下标，通过索引下标,获取对应的数据。
            // 起始数值是0 终止数值是 arr[i]的最大索引下标，arr[i]的length-1
            for (var j = 0; j <= arr[i].length - 1; j++) {
                // 每一个单元的内容,就是当前二维数组单元的数据内容
                // 获取二维数组, 数组变量[一维索引][二维索引] 一维索引是i 二维索引是j
                strr += `<td>${arr[i][j]}</td>`;
            }
            strr += '</tr>';
        }
        // 将定义好的内容,写入到taody标签中
        // contain.innerHTML = str;
        return strr
    }
    render() {
        return <div>
            <p>总字数：300；
                等级大纲字数/%:50%</p>
            <table id={this.props.tableID} border="1" style={{ margin: '0 auto', width: '500px', height: ' 100px' }}>
                <thead>
                    <tr>
                        <th>级别</th>
                        <th onClick={this.props.setone}>1</th>
                        <th onClick={this.props.settwo}>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                        <th>6</th>
                        <th>7</th>
                        <th>8</th>
                        <th>9</th>
                        <th>未录入</th>
                    </tr>
                </thead>
                <tbody dangerouslySetInnerHTML={{ __html: `<div>${this.state.str1}</div>` }} />
                
            </table>
            <p>总词数：300；
                等级大纲词数/%:50%</p>
            <table  border="1" style={{ margin: '0 auto', width: '500px', height: ' 100px' }}>
                <thead>
                    <tr>
                        <th>级别</th>
                        <th onClick={this.props.setone}>1</th>
                        <th onClick={this.props.settwo}>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                        <th>6</th>
                        <th>7</th>
                        <th>8</th>
                        <th>9</th>
                        <th>未录入</th>
                    </tr>
                </thead>
                <tbody dangerouslySetInnerHTML={{ __html: `<div>${this.state.str2}</div>` }} />

            </table>
        </div>
        
    }
}
export default DataToTable;