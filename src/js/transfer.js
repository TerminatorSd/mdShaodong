import Reg from './reg';
import Prism from 'prismjs';

let resultHtml = '';
let tempHtml = '';
let codeFlag = 0;

const doTransfer = (str) => {
  resultHtml = '';

  str.split('\n').forEach(item => {
    toHtml(item);
  });

  return resultHtml;
};

const toHtml = (str) => {
  let img = str.match(new RegExp(`^!\\[(.*?)][ \\t]*\\((` + Reg.URL + `)\\)([ \\t])*(["'].*["'])?`)) ||
            str.match(/^!\[(.*?)\][ \t]*\([ \t]*([^")]*?)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/);
  // 标题
  if (str.match(Reg.TITLE)) {
    let header = str.match(Reg.TITLE);
    resultHtml += `<h${header[1].length}>${header[2]}</h${header[1].length}>`;
  } else if (str.match(Reg.HREF)) {
    // 超链接
    resultHtml += `<a href="${str.split(')')[0].split('(')[1]}">${str.split(')')[0].split('(')[1]}</a>`;
  } else if (img) {
    // 图片
    resultHtml += `<img src="${img[2]}" alt="${img[1]}"></img>`;
  } else if (str.match(/(`+)(([\s\S]*?))/)) {
    // 代码
    let code = str.match(/(`+)(([\s\S]*?))/);
    // 单行代码
    if (code[0].length === 1) {
      // 单行内容不为空
      if (str.replace(/`/g, '')) {
        const codeHtml = Prism.highlight(str.replace(/`/g, ''), Prism.languages.javascript, 'javascript');
        resultHtml += `<pre>${codeHtml}</pre>`;
      }
    } else if (code[0].length === 3) {
      // 多行代码
      if (codeFlag === 0) {
        codeFlag = 1;
      } else {
        // 多行内容不为空
        if (tempHtml) {
          const codeHtml = Prism.highlight(tempHtml, Prism.languages.javascript, 'javascript');
          resultHtml += `<pre>${codeHtml}</pre>`;
          codeFlag = 0;
          tempHtml = '';
        }
      }
    }
  } else {
    // 普通文本或者多行代码内的文本
    if (codeFlag === 1) {
      tempHtml += `${str}\n`;
    } else {
      resultHtml += `<p>${str}</p>`;
    }
  }
};

export default doTransfer;
