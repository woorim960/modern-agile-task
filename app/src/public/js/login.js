const id = document.querySelector('#id');
const password = document.querySelector('#password');
const logButton = document.querySelector("#login");
const conButton = document.querySelector("#confirm");
const span = document.querySelector("#result");
let code = '';

logButton.addEventListener("click", () => {
    fetch("/api/login", {
        method : "POST",
        headers : {
          "Content-Type" : "application/json; charset=utf-8",
        },
        body : JSON.stringify({
            id : id.value,
            password : password.value
        }),
      })
      .then((res) => res.json())
      .then(res => {
        if (res.msg === "success") {
            code = res.code;
            alert("코드가 발급되었습니다.");
        }
        else {
            code = "";
            alert("아이디와 패스워드를 제대로 입력하십시오");
        }
    });
})


conButton.addEventListener("click", () => {
    fetch(`/api/check?code=${code}`, {
        method : "GET",
        headers : {
          "Content-Type" : "application/json; charset=utf-8",
        },
      })
      .then((res) => res.json())
      .then(res => {
        if (res.msg === "success") {
            span.innerHTML = `${res.user.name}님 환영합니다.`;
        }
        else alert("정보확인에 실패하셨습니다.");
    });
});

