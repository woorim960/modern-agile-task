"use strict";


const id = document.querySelector("#id");
const submit = document.querySelector("#login");
const password = document.getElementById("password");
const confirms = document.querySelector("#confirm");

confirms.addEventListener("click", check);
submit.addEventListener("click", output);


function output() {
    
    const req = {
        id: id.value,
        password: password.value,
    }
    console.log(req)

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
            alert("코드가 발급되었습니다.")
        } else {
            alert("아이디와 패스워드를 제대로 입력해 주십시오")
        }
      })
  } 

  function check() {
        // 코드를 가지고있다면 서버로 보낸다
        
        // 가지고있지않다면
        alert("로그인을 먼저 시도하십시오")
  }