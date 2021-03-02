"use strict";

const checkbox = document.querySelectorAll("#checkbox label input");
const submit = document.querySelector("#submit_btn");
const result = document.getElementById("result");

submit.addEventListener("click", output);

function output() {
    const req = {
      answers : []
    };
    
    for (let i=0; i < checkbox.length; i++) {
      if (checkbox[i].checked == true) {
          let a = checkbox[i].value;
          req.answers.push(a)
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
          result.innerHTML = `정답`;
        } else {
           result.innerHTML = `오답`;
        }
      })
}