"use strict";

const checkbox = document.querySelectorAll("#checkbox input");
const btn = document.querySelector("#submit_btn");
const result = document.querySelector("#result");

btn.addEventListener("click", check);

function check() {
    let box = [];

    for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
            box.push(checkbox[i].value);
        }
    }

    const req = {
        answers : box
    }

    fetch("/api/checkbox/submit", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(req)
    })
    .then((res) => res.json())
    .then((res) => {
        answer(res);
    })
    .catch((err) => {
        throw err;
    })

    function answer(res) {
        if(res) {
            result.innerHTML = "정답";
        } else {
            result.innerHTML = "오답";
        }
    }
}
