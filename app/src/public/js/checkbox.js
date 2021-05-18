'use strict';

const SUBMIT_URL = '/api/checkbox/submit';
const button = document.querySelector('#submit_btn');
const result = document.querySelector('#result');

button.addEventListener('click', () => {
  const answers = [];
  const query = 'input[type="checkbox"]:checked';
  const checkBox = document.querySelectorAll(query);

  for (let i = 0; i < checkBox.length; i++) {
    answers.push(checkBox[i].value);
  }

  const config = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ answers }),
  };

  fetch(SUBMIT_URL, config)
    .then((response) => response.json())
    .then((isAnswer) => (result.innerHTML = isAnswer ? '정답' : '오답'));
});
