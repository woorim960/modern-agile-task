"use strict";
const checkBox = document.querySelectorAll("#checkbox label input");
const button = document.querySelector("#submit_btn");

button.addEventListener("click", () => {
    const checkedBoxes =[];
    for (let i = 0; i < checkBox.length; i++) {
        if(checkBox[i].checked) checkedBoxes.push(checkBox[i].value);
    }
    console.log(checkedBoxes);
    fetch("/api/checkbox/submit", {
        method: "post",
        headers: {
            "Content-type" : "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            answers : checkedBoxes,
        })
    })
    .then(res => res.json())
    .then(res => result.innerHTML = res ? "정답" : "오답");
})