"use strict";

const idInput = document.querySelector('#id');
const pwdInput = document.querySelector('#password');
const loginBtn = document.querySelector('#login');
const confirmBtn = document.querySelector('#confirm');
const result = document.querySelector('#result');

loginBtn.addEventListener('click', actionLogin);
confirmBtn.addEventListener('click', actionCheck);

const URI_LOGIN = '/api/login';

let codeData = {};

async function actionLogin() {
    const value = {
        id: idInput.value,
        password: pwdInput.value,
    };

    codeData = await fetch(URI_LOGIN, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json' 
                        },
                        body: JSON.stringify(value),
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.msg === 'success') alert("코드가 발급되었습니다.");
                        else alert(data.msg);

                        return data;
                    });
}

function actionCheck() {
    fetch(`/api/check?code=${codeData.code}`)
    .then(response => response.json())
    .then(data => {
        if (data.msg === "success") {
            result.innerHTML = `${data.user.name}님 환영합니다`
        } else {
            alert(data.msg);
        }
    });
}

