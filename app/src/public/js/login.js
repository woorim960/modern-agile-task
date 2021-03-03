"use strict";

const id = document.querySelector("#id");
const password = document.querySelector("#password");
const loginBtn = document.querySelector("#login");
const confirmBtn = document.querySelector("#confirm");
const result = document.querySelector("#result");

loginBtn.addEventListener("click", login);
confirmBtn.addEventListener("click", check);

let code = "";

function login() {
    const req = {
        id: id.value,
        password: password.value
    };
    const URL = "/api/login";
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(req)
    })
    .then((res) => res.json())
    .then((res) => {
       if (res.code) {
        alert("코드가 발급되었습니다");
        code = res.code;
       } else {
        alert(res.msg);
       }
    })
    .catch((err) => {
        throw err;
    })
}

function check() {
    const URL = `/api/check?code=${code}`;
    fetch(URL, {
        method: "GET"
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.user) {
            result.innerHTML = `${res.user.name}님 환영합니다`;
        } else {
            alert("정보확인에 실패했습니다.");
        }
    })
    .catch((err) => {
        throw err;
    })
}