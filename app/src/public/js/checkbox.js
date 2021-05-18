"use strict";

const checkBoxes = document.querySelectorAll('input');
const submitButton = document.querySelector('#submit_btn')
const resultSpan = document.querySelector('#result');

submitButton.addEventListener('click', async () => {
  const answers = Array.from(checkBoxes)
  .filter((checkBox) => checkBox.checked)
  .map((checkBox) => checkBox.value);

  const response = await fetch('/api/checkbox/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ answers })
  });
  const result = await response.json();

  resultSpan.textContent = (result) ? '정답' : '오답';
});
