import React from "react";
import ExcelJs from "exceljs";
import Button from "@mui/material/Button";

// const mockData = [
//   {
//     // 级别: "字数",
//     一级: "Male",
//     二级: "175",
//     三级: "Male",
//     四级: "175",
//     五级: "Male",
//     六级: "175",
//     高等: "Male",
//     未录入: "175"
//   },
//   {
//     // 级别: "占比",
//     一级: "Male",
//     二级: "180",
//     三级: "Male",
//     四级: "175",
//     五级: "Male",
//     六级: "175",
//     高等: "Male",
//     未录入: "175"
//   },

// ];

function ExportToExcel(props) {
  const mockData = props.zishu_hsk;
  const mockData369 = props.zishu_369;
  const ciData = props.ci_hsk;
  const ciData369 = props.ci_369;
  //console.log(mockData);
  const exportToExcel = (data, data2, data3, data4) => {
    let sheetName = "基本信息1.xlsx";
    let headerName = "RequestsList";

    // 获取sheet对象，设置当前sheet的样式
    // showGridLines: false 表示不显示表格边框
    let workbook = new ExcelJs.Workbook();
    let sheet = workbook.addWorksheet(sheetName, {
      views: [{ showGridLines: true }],
    });
    let sheet2 = workbook.addWorksheet("基本信息2.xlsx", {
      views: [{ showGridLines: true }],
    });
    let sheet3 = workbook.addWorksheet("基本信息3.xlsx", {
      views: [{ showGridLines: true }],
    });
    let sheet4 = workbook.addWorksheet("基本信息4.xlsx", {
      views: [{ showGridLines: true }],
    });

    // 获取每一列的header
    let columnArr = [];
    for (let i in data[0]) {
      let tempObj = { name: "" };
      tempObj.name = i;
      columnArr.push(tempObj);
    }

    // 设置表格的头部信息，可以用来设置标题，说明或者注意事项
    sheet.addTable({
      name: `Header`,
      ref: "A2", // 头部信息从A1单元格开始显示
      headerRow: true,
      totalsRow: false,
      style: {
        theme: "",
        showRowStripes: false,
        showFirstColumn: true,
        width: 200,
      },
      columns: [{ name: "级别" }],
      rows: [[`字数`], [`占比`]],
    });

    // 设置表格的主要数据部分
    sheet.addTable({
      name: headerName,
      ref: "B2", // 主要数据从A5单元格开始
      headerRow: true,
      totalsRow: false,
      style: {
        theme: "TableStyleMedium2",
        showRowStripes: false,
        width: 200,
      },
      columns: columnArr ? columnArr : [{ name: "" }],
      rows: data.map((e) => {
        let arr = [];
        for (let i in e) {
          arr.push(e[i]);
        }
        return arr;
      }),
    });

    sheet.getCell("A1").font = { size: 20, bold: true }; // 设置单元格的文字样式

    // 设置每一列的宽度
    sheet.columns = sheet.columns.map((e) => {
      const expr = e.values[5];
      switch (expr) {
        case "级别":
          return { width: 40 };
        case "Gender":
          return { width: 40 };
        case "Height":
          return { width: 30 };
        default:
          return { width: 20 };
      }
    });

    //sheet2
    // 获取每一列的header
    let columnArr2 = [];
    for (let i in data2[0]) {
      let tempObj = { name: "" };
      tempObj.name = i;
      columnArr2.push(tempObj);
    }
    // 设置表格的头部信息，可以用来设置标题，说明或者注意事项
    sheet2.addTable({
      name: `Header`,
      ref: "A2", // 头部信息从A1单元格开始显示
      headerRow: true,
      totalsRow: false,
      style: {
        theme: "",
        showRowStripes: false,
        showFirstColumn: true,
        width: 200,
      },
      columns: [{ name: "级别" }],
      rows: [[`字数`], [`占比`]],
    });

    // 设置表格的主要数据部分
    sheet2.addTable({
      name: headerName,
      ref: "B2", // 主要数据从A5单元格开始
      headerRow: true,
      totalsRow: false,
      style: {
        theme: "TableStyleMedium2",
        showRowStripes: false,
        width: 200,
      },
      columns: columnArr2 ? columnArr2 : [{ name: "" }],
      rows: data2.map((e) => {
        let arr = [];
        for (let i in e) {
          arr.push(e[i]);
        }
        return arr;
      }),
    });

    sheet2.getCell("A1").font = { size: 20, bold: true }; // 设置单元格的文字样式

    // 设置每一列的宽度
    sheet2.columns = sheet2.columns.map((e) => {
      const expr = e.values[5];
      switch (expr) {
        case "级别":
          return { width: 40 };
        case "Gender":
          return { width: 40 };
        case "Height":
          return { width: 30 };
        default:
          return { width: 20 };
      }
    });

    //sheet3
    // 获取每一列的header
    let columnArr3 = [];
    for (let i in data3[0]) {
      let tempObj = { name: "" };
      tempObj.name = i;
      columnArr2.push(tempObj);
    }
    // 设置表格的头部信息，可以用来设置标题，说明或者注意事项
    sheet3.addTable({
      name: `Header`,
      ref: "A2", // 头部信息从A1单元格开始显示
      headerRow: true,
      totalsRow: false,
      style: {
        theme: "",
        showRowStripes: false,
        showFirstColumn: true,
        width: 200,
      },
      columns: [{ name: "级别" }],
      rows: [[`字数`], [`占比`]],
    });

    // 设置表格的主要数据部分
    sheet3.addTable({
      name: headerName,
      ref: "B2", // 主要数据从A5单元格开始
      headerRow: true,
      totalsRow: false,
      style: {
        theme: "TableStyleMedium2",
        showRowStripes: false,
        width: 200,
      },
      columns: columnArr2 ? columnArr2 : [{ name: "" }],
      rows: data3.map((e) => {
        let arr = [];
        for (let i in e) {
          arr.push(e[i]);
        }
        return arr;
      }),
    });

    sheet3.getCell("A1").font = { size: 20, bold: true }; // 设置单元格的文字样式

    // 设置每一列的宽度
    sheet3.columns = sheet3.columns.map((e) => {
      const expr = e.values[5];
      switch (expr) {
        case "级别":
          return { width: 40 };
        case "Gender":
          return { width: 40 };
        case "Height":
          return { width: 30 };
        default:
          return { width: 20 };
      }
    });

    //sheet4
    // 获取每一列的header
    let columnArr4 = [];
    for (let i in data4[0]) {
      let tempObj = { name: "" };
      tempObj.name = i;
      columnArr2.push(tempObj);
    }
    // 设置表格的头部信息，可以用来设置标题，说明或者注意事项
    sheet4.addTable({
      name: `Header`,
      ref: "A2", // 头部信息从A1单元格开始显示
      headerRow: true,
      totalsRow: false,
      style: {
        theme: "",
        showRowStripes: false,
        showFirstColumn: true,
        width: 200,
      },
      columns: [{ name: "级别" }],
      rows: [[`字数`], [`占比`]],
    });

    // 设置表格的主要数据部分
    sheet4.addTable({
      name: headerName,
      ref: "B2", // 主要数据从A5单元格开始
      headerRow: true,
      totalsRow: false,
      style: {
        theme: "TableStyleMedium2",
        showRowStripes: false,
        width: 200,
      },
      columns: columnArr2 ? columnArr2 : [{ name: "" }],
      rows: data4.map((e) => {
        let arr = [];
        for (let i in e) {
          arr.push(e[i]);
        }
        return arr;
      }),
    });

    sheet4.getCell("A1").font = { size: 20, bold: true }; // 设置单元格的文字样式

    // 设置每一列的宽度
    sheet4.columns = sheet4.columns.map((e) => {
      const expr = e.values[5];
      switch (expr) {
        case "级别":
          return { width: 40 };
        case "Gender":
          return { width: 40 };
        case "Height":
          return { width: 30 };
        default:
          return { width: 20 };
      }
    });
    // const table = sheet.getTable(headerName);
    // for (let i = 0; i < table.table.columns.length; i++) {
    //   // 表格主体数据是从A5开始绘制的，一共有三列。这里是获取A5到，B5，C5单元格，定义表格的头部样式
    //   sheet.getCell(`${String.fromCharCode(65 + i)}5`).font = { size: 12 };
    //   sheet.getCell(`${String.fromCharCode(65 + i)}5`).fill = {
    //     type: "pattern",
    //     pattern: "solid",
    //     fgColor: { argb: "c5d9f1" }
    //   };

    //   // 获取表格数据部分，定义其样式
    //   for (let j = 0; j < table.table.rows.length; j++) {
    //     let rowCell = sheet.getCell(`${String.fromCharCode(65 + i)}${j + 6}`);
    //     rowCell.alignment = { wrapText: true };
    //     rowCell.border = {
    //       bottom: {
    //         style: "thin",
    //         color: { argb: "a6a6a6" }
    //       }
    //     };
    //   }
    // }
    // table.commit();

    const writeFile = (fileName, content) => {
      const link = document.createElement("a");
      const blob = new Blob([content], {
        type: "application/vnd.ms-excel;charset=utf-8;",
      });
      link.download = fileName;
      link.href = URL.createObjectURL(blob);
      link.click();
    };

    // 表格的数据绘制完成，定义下载方法，将数据导出到Excel文件
    workbook.xlsx.writeBuffer().then((buffer) => {
      writeFile(sheetName, buffer);
    });
  };

  return (
    <Button
      onClick={() => {
        exportToExcel(mockData, mockData369, ciData, ciData369);
      }}
      style={{ backgroundColor: "#F0F2F5" }}
    >
      下载excel
    </Button>
  );
}

export default ExportToExcel;
