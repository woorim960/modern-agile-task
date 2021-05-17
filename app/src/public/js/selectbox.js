"use strict"
const selected = document.getElementsByName("selectbox")[0];
const button = document.getElementById("submit-btn");
const result = document.getElementById("result");

button.addEventListener("click", () => {
    fetch("/api/selectbox/submit", {
        method : "POST",
        headers : {"Content-Type" : "application/json; charset = utf-8"},
        body : JSON.stringify({
            answer : selected.value        
        })
    })
    .then((response) => response.json())
    .then((isAnswer) => result.innerHTML = isAnswer ? "정답" : "오답");
}); 

