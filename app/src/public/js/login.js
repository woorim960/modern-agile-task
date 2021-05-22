"use strict";

const ID = document.querySelector("#id"),
    pass = document.querySelector("#password"),
    login = document.querySelector("#login"),
    confirm = document.querySelector("#confirm"),
    output = document.querySelector("#result");

let code = ""; 

login.addEventListener("click",() => {
    const loginInfo = {
        id : ID.value,
        password : pass.value
    };
    request(loginInfo);
});

confirm.addEventListener("click", () => {
    infoCheck(code);
    console.log(code);
});

const request = (loginInfo) => {

    const head = {'Content-Type' : 'application/json; charset=utf-8',};
    const obj = {
        method : 'POST',
        headers : head,
        body : JSON.stringify(loginInfo)
    };
    
    fetch("/api/login", obj)
        .then((res) => res.json())
        .then((data) => {
            if(data.code) {
                alert("코드가 발급되었습니다.");
                code = data.code;
            } else {
                code = "";
                alert(data.msg);
            }; 
        });
} 

const infoCheck = (code) => {
    
    fetch(`/api/check?code=${code}`)
        .then((res) => res.json())
        .then((data) => {
            if(data.msg === "success") {
                output.innerText = `${data.user.name}님 환영합니다.`;   
            } else alert(data.msg);
        });
}
