// main.js
import transfer from './src/js/transfer.js';

import './src/scss/index.scss';
import './src/scss/style.scss';
import './src/scss/prism.scss';

document.getElementById('ok').onclick = () => {
  const content = document.getElementById('content').value;
  if (content) {
    const resultHtml = transfer(content);
    document.getElementById('res').innerHTML = resultHtml;
  }
}
