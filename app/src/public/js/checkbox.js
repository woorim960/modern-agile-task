"use strict";

const answers = document.querySelector("#result"),
    submitBtn = document.querySelector("#submit_btn"),
    checkbox = document.querySelector("#checkbox"),
    checkInput = document.querySelectorAll('input');

    console.log(checkbox)
    console.log(checkInput)

submitBtn.addEventListener("click", output2);

function output2() {

    const req = {
        answers: [],
      };

    for(var i = 0; i < checkInput.length; i++){
        if(checkInput[i].checked){
            req.answers.push(checkInput[i].value)
            console.log(req.answers)
        }
    }

    fetch("/api/checkbox/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          answers.innerHTML = `정답`;
        } else {
           answers.innerHTML = `오답`;
        }
      })
    }
