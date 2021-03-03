"use strict";

const id = document.querySelector("#id"),
  password = document.querySelector("#password"),
  loginBtn = document.querySelector("#login"),
  confirmBtn = document.querySelector("#confirm"),
  result = document.querySelector("#result");

const codeStore = [];

async function run() {
  await loginBtn.addEventListener("click", Click.login);
  confirmBtn.addEventListener("click", Click.confirm);
}

class Click {
  static login() {
    const data = {
      id: id.value,
      password: password.value,
    };
    console.log(data);

    const post = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const request = (post) => {
      fetch("/api/login", post)
        .then((res) => res.json())
        .then((res) => resultMsg(res));
    };

    request(post);

    const resultMsg = (res) => {
      if (res.msg === "success") {
        alert("코드가 발급되었습니다.");
        return codeStore.push(res.code);
      }
      return alert("아이디와 패스워드를 제대로 입력해 주십시오");
    };
  }

  static confirm() {
    const code = codeStore[0];

    const get = {
      method: "GET",
    };

    const request = (get) => {
      fetch(`/api/check?code=${code}`, get)
        .then((res) => res.json())
        .then((res) => resultMsg(res));
    };

    request(get);

    const resultMsg = (res) => {
      if (res.msg === "success") return (result.innerText = `${res.user.name}님 환영합니다.`);
      alert("정보확인에 실패하셨습니다.");
    };
  }
}

run();
