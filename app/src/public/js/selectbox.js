"use strict";
const selectBox = document.querySelector("select");
const submitBtn = document.querySelector("#submit-btn");
const result = document.querySelector("#result");

submitBtn.addEventListener("click", onSubmit);

function onSubmit(e) {
    fetch('/api/selectbox/submit', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            answer: selectBox.value,
        })
    })
    .then(res => res.json())
    .then(isAnswer => {
        result.innerHTML = isAnswer ?  '정답' : '오답';
    });
    
}