"use strict";

const id = document.querySelector("#id");
const password = document.querySelector("#password");
const loginBtn = document.querySelector("#login");
const confirmBtn = document.querySelector("#confirm");
const result = document.querySelector("#result");

loginBtn.addEventListener("click", login);
confirmBtn.addEventListener("click", confirm);

let code = "";

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
      if (res.msg === "success") {
        code = res.code;
        alert("성공!");
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      throw err;
    });
}

function confirm() {
  if (code) {
    fetch(`/api/check?code=${code}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg === "success") {
          result.innerHTML = `${res.user.name}님 환영합니다.`;
        } else {
          alert("code가 일치하지 않습니다.");
        }
      })
      .catch((err) => {
        throw err;
      });
  } else {
    alert("로그인 먼저");
  }
}
