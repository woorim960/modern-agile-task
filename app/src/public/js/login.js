"use strict";

const loginBtn = document.querySelector('#login');
const confirmBtn = document.querySelector('#confirm');
const id = document.querySelector('#id');
const password = document.querySelector('#password');
const result = document.querySelector('#result');
let code = '';
//로그인버튼 함수 post
loginBtn.addEventListener('click', () => {
    fetch('/api/login', {
        method : 'POST',
        headers : {
            'Content-type' : 'application/json; charset=utf-8',
        },
        body : JSON.stringify({
            id : id.value,
            password : password.value
        })
    })
    .then((res) => res.json())
    .then((res) => {
        console.log(res)
        if (res.msg === 'success') {
            alert('코드가 발급되었습니다.');
            code = res.code;
        }
        else alert(res.msg);
    });
});

//정보확인버튼
confirmBtn.addEventListener('click', () => {
    fetch(`/api/check?code=${code}`, {
        method : 'GET',
        headers : {
            'Content-type' : 'application/json; charset=utf-8'
        },
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.msg === 'success') result.innerHTML = `${res.user.name}님 환영합니다.`;
        else alert(res.msg);
    })
});