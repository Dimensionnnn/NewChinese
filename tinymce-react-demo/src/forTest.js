var str = '<head><meta charset="utf-8"></meta>',
    styles = document.querySelectorAll('style');
for (var n = 0; n < styles.length; n++) {
    str += styles[n].outerHTML;
}
str += "<style>table tr td{padding-left:5px;padding-right:5px}.tdTitle{background:#c2c1c1}.spaceRow{margin-top:10px;}table{width:100%;}</style>";
str += "<style>table{border-collapse: collapse;table-layout: fixed}</style>"
str += "<style>table td,th{ height:30px;font-size:14px;border-width:1px;border-style: solid;border-color: #000;word-break: keep-all;}</style>"
str += "</head>"

var fileContent = statics.mhtml.top.replace("_html_", statics.mhtml.head.replace("_styles_", str) + statics.mhtml.body.replace("_body_", markup.html())) + mhtmlBottom;