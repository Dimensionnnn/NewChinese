const getParseText = (html: any) => {
    const reg = new RegExp('<(.+?)>(.*?)</.+?>', 'g');
    let flag = false;
    const msg = html.replace(reg, (all: any, tag: any, content: any) => {
        if (tag === 'strong') {
            return content;
        } else {
            const res = content.replace(new RegExp('<.+?>', 'g'), '');
            flag = true;
            return `<p>${res}</p>`;
        }
    });
    if (flag) {
        return msg;
    } else {
        const res = msg.replace(new RegExp('<.+?>', 'g'), '');
        return res;
    }
};
// 主函数
const handlePasteText = (html: any) => {
    const reg = new RegExp('<.+?>(.*?)</.+?>', 'g');
    const msg = html.replace(reg, (all: any, content: any) => {
        return getParseText(content);
    });
    const res = msg.replace(new RegExp('<.+?>', 'g'), '<p>');
    return res;
};
