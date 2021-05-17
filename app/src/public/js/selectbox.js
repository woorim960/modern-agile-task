"use strict";
const select = document.getElementsByName("selectbox")[0];
const button = document.getElementById("submit-btn");

button.addEventListener("click", () => {
    fetch('/api/selectbox/submit', {
        method: 'post',
        headers: {
        'Content-type' : 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            answer: select.value,
        })
      })
      .then(res => res.json())
      .then(res => result.innerHTML = res ? "정답" : "오답");
});