"use strict";

const selectBox = document.getElementsByName('selectbox')[0];
const submitButton = document.getElementById('submit-btn');
const resultSpan = document.getElementById('result');

submitButton.onclick = async () => {
  const response = await fetch('/api/selectbox/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      answer: selectBox.value
    })
  });
  const result = await response.json();
  resultSpan.textContent = (result) ? '정답' : '오답';
};
