'use strict';

const SUBMIT_URL = '/api/selectbox/submit';
const mode = document.getElementById('submit-btn');
const selectBox = document.getElementsByName('selectbox')[0]; // const selectBox = document.querySelector('select');
const result = document.getElementById('result');
// mode.addEventListener('click', function () {
//   selectBox.value === '개발'
//     ? (document.getElementById('result').innerHTML = '정답')
//     : (document.getElementById('result').innerHTML = '오답');
// });

mode.addEventListener('click', () => {
  fetch(SUBMIT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ answer: selectBox.value }),
  })
    .then((response) => response.json())
    .then((isAnswer) => (result.innerHTML = isAnswer ? '정답' : '오답'));
});
