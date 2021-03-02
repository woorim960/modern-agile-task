"use strict";

const target = document.getElementsByName("selectbox")[0];
const submit = document.querySelector("#submit-btn");
const result = document.getElementById("result");
// function selectBox() {
//     if (target.options[target.selectedIndex].value === "개발") document.querySelector('#result').innerHTML='정답';
//     else document.querySelector('#result').innerHTML='오답';
// }

// submit.onclick = selectBox;

submit.addEventListener("click", output);

function output() {
    console.log(target.value)
    const req = {
        answer : target.value
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
          result.innerHTML = `정답`;
        } else {
           result.innerHTML = `오답`;
        }
      })
  } 