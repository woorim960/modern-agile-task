"use strict";
const id = document.querySelector("#id");
const password = document.querySelector("#password");
const loginBtn = document.querySelector("#login");
const confirmBtn = document.querySelector("#confirm");
const result = document.querySelector("#result");
let code = "";

loginBtn.addEventListener("click", () => {
        const login = { 
            id : id.value, 
            password : password.value 
        };

        fetch("/api/login", {
        method : "POST",
        headers : {"Content-Type" : "application/json; charset = utf-8"},
        body : JSON.stringify(login)
    })
    .then((response) => response.json())
    .then((answers) => {
        if (answers) { 
            alert("코드가 발급되었습니다.");
            code = answers.code;
        } else alert(answers.msg);
    });
});

confirmBtn.addEventListener("click",() => {
    fetch( `/api/check?code=${code}`, {
        method : "GET",
    })
        .then((response) => response.json())
        .then((answers) => {
            if (code) {
                result.innerHTML = `${answers.user.name}님 환영합니다.`
            } else alert(answers.msg);
        });
});
