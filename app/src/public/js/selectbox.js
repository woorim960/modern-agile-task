"use strict";

const answer = document.querySelector("#result"),
    submitBtn = document.querySelector("#submit-btn"),
    selectbox = document.querySelector("select");

submitBtn.addEventListener("click", output);

function output() {
    
    const req = {
      answer: selectbox.value,
    };

    fetch("/api/selectbox/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          answer.innerHTML = `정답`;
        } else {
           answer.innerHTML = `오답`;
        }
      })
  }