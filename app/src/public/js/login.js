'use strict';

const LOGIN_URL = '/api/login';
let code;
const id = document.querySelector('#id');
const password = document.querySelector('#password');
const login = document.querySelector('#login');
const confirm = document.querySelector('#confirm');
const result = document.querySelector('#result');

login.addEventListener('click', () => {
  const config = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ id: id.value, password: password.value }),
  };

  fetch(LOGIN_URL, config)
    .then((res) => res.json())
    .then((login) => {
      if (login.msg === 'success') {
        code = login.code;
        alert('코드가 발급되었습니다.');
      } else {
        alert(login.msg);
      }
    });
});

confirm.addEventListener('click', () => {
  const config = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
  };

  fetch(`/api/check?code=${code}`, config)
    .then((res) => res.json())
    .then((check) => {
      if (check.msg === 'success') {
        result.innerHTML = check.user.name + '님 환영합니다.';
      } else {
        alert(check.msg);
      }
    });
});
