"use strict";

const buttonLogin = document.querySelector("#login");
const buttonConfirm = document.querySelector("#confirm");
let userCode;

buttonLogin.addEventListener("click", () => {
    const inputId = document.querySelector("#id");
    const inputPassword = document.querySelector("#password");

    fetch("/api/login", {
        method: "post",
        headers: {
            "Content-type" : "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            id : inputId.value,
            password : inputPassword.value,
        })
    })
    .then(res => res.json())
    .then(res => {
        if (res.msg === "success") {
            alert("코드가 발급되었습니다.");
            userCode = res.code;
            return userCode;
        }
        alert(res.msg);
        return userCode = undefined;
    })
})

buttonConfirm.addEventListener("click", () => {
    fetch(`/api/check?code=${userCode}`, {
        method: "GET",
        headers: {
            "Content-type" : "application/json; charset=utf-8"
        }
    })
    .then(res => res.json())
    .then(res => res.msg === "success" ? result.innerHTML = `${res.user.name}님 환영합니다.` : alert(res.msg));
})