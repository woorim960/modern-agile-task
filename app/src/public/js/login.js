"use strict";

const idInput = document.querySelector('#id');
const passwordInput = document.querySelector('#password');
const loginButton = document.querySelector('#login');
const confirmButton = document.querySelector('#confirm');
const resultSpan = document.querySelector('#result');
let code;

loginButton.addEventListener('click', async () => {
  const id = idInput.value;
  const password = passwordInput.value;

  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ id, password })
  });
  let msg;
  ({ msg, code } = await response.json());

  if (code === undefined) {
    alert(msg);
  }
  else {
    alert('코드가 발급되었습니다.');
  }
});

confirmButton.addEventListener('click', async () => {
  if (code === undefined) {
    alert('정보확인에 실패하셨습니다.');
    return;
  }

  const response = await fetch('/api/check?' + new URLSearchParams({ code }), {
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  });
  const result = await response.json();
  
  resultSpan.textContent = `${result['user']['name']}님 환영합니다.`;
});

// 29분
