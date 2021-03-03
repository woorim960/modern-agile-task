'use strict'

const id = document.querySelector("#id"),
    password = document.querySelector("#password"),
    loginBtn = document.querySelector("#login"),
    confirmBtn = document.querySelector("#confirm"),
    result = document.querySelector("#result");
let code;

loginBtn.addEventListener("click", login);

function login() {
    
    const req = {
      id: id.value,
      password: password.value,
    };

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg === 'success') {
            console.log(res);
            code = res.code;
            name = res.name;
            console.log(code);
            console.log(name);
          alert('코드가 발급되었습니다.')
        } else {
           alert(res.msg)
        }
      })
  }


confirmBtn.addEventListener("click", check);

function check() {

    const req = {
        msg: code,
      };
  
      fetch("/api/check?code="+code, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (code) {
              console.log(res)
            result.innerHTML = `${res.user.name}님 환영합니다`;
          } else {
             alert(res.msg)
          }
        })
}