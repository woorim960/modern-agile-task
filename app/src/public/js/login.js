"use strict";

const id = document.querySelector("#id");
const submit = document.querySelector("#login");
const password = document.querySelector("#password");
const confirms = document.querySelector("#confirm");
const result = document.getElementById("result");

confirms.addEventListener("click", check);
submit.addEventListener("click", output);

let code = "";

function output() {
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
          alert("코드가 발급되었습니다.")
          code = res.code;
        } else {
          alert(res.msg)
        }
      })
  } 

  function check() {
    fetch(`/api/check?code=${code}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.msg !== "success") {
          alert(res.msg)
        } else {
          result.innerHTML = `${res.user.name}님 환영합니다.`
        }
      })
  }


  //null이니 body를 지우는?