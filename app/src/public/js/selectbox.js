"use strict";

const select = document.getElementsByName("selectbox")[0];
const submitBtn = document.querySelector("#submit-btn");
const result = document.querySelector("#result");

submitBtn.addEventListener("click", choice);

function choice() {
    const req = {};

    for (let el of select.options) {
        if (el.selected) {
            req.answer = el.value;
        }
    }

    fetch("/api/selectbox/submit", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(req)
    })
    .then((res) => res.text())
    .then((res) => {
        if (res) {
            answer(res);
        }
    })
    .catch((err) => {
        throw err;
    });

    function answer(res) {
        if (res === "true") {
            result.innerHTML = "정답";
        } else {
            result.innerHTML = "오답";
        }
    }
}