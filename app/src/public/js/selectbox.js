"use strict";
const submitBtn = document.querySelector('#submit-btn');
const selectBox = document.querySelector('select');
const result = document.getElementById("result");

submitBtn.addEventListener('click', () => {
    fetch('/api/selectbox/submit', {
        method : "POST",
        headers : {
            "Content-Type" : "application/json; charset=utf-8",
        },
        body : JSON.stringify({
            answer : selectBox.value
        })
    })
    .then((res) => res.json())
    .then((isAnswer) => result.innerHTML = isAnswer ? "정답" : "오답");
});