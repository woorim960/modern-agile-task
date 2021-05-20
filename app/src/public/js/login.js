"use strict"; 
const id = document.querySelector("#id");
const password = document.querySelector("#password");
const loginBtn = document.querySelector("#login");
const confirmBtn = document.querySelector("#confirm");
const result = document.querySelector("#result");
let code = "";

loginBtn.addEventListener("click", () => {
    fetch('/api/login', {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json" 
        },
        body: JSON.stringify({
           id: id.value,
           password: password.value
        }),
    })
    .then(res => res.json())
    .then(answers => {
       if (answers) {
           alert(answers.msg);
           code = answers.code;
       }
       else alert(answers.msg);
    })
});

confirmBtn.addEventListener("click", () => {
    fetch(`/api/check?code=${code}`, {
        method: 'GET',
        headers: {
            "Content-Type" : "application/json" 
        }
    })
    .then(res => res.json())
    .then(answers => {
        if (code) {
            alert(answers.msg);
            result.innerHTML = `${answers.user.name} 님 환영합니다.`;
        }
        else answers.msg;
    })
});