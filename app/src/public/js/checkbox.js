"use strict";
const button = document.querySelector("#submit_btn");
const result = document.querySelector("#result");

button.addEventListener("click", () => {
    const check = document.querySelectorAll('input[type="checkbox"]:checked');
    const checkLists = [];
    check.forEach(function(ch) {
        checkLists.push(ch.value)
    })
    console.log(checkLists);
    fetch("/api/checkbox/submit", {
        method : "POST",
        headers : {"Content-Type" : "application/json; charset = utf-8"},
        body : JSON.stringify({
            answers :  checkLists
        })
    })
    .then((response) => response.json())
    .then((isAnswer) => result.innerHTML = isAnswer ? "정답" : "오답");
});