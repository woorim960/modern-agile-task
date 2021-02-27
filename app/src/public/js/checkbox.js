"use strict";

const checkboxes = document.querySelectorAll("#checkbox input");
const submit = document.querySelector("#submit_btn");
const result = document.querySelector("#result");

submit.addEventListener("click", chboxHandler);

function chboxHandler() {
  const seletedboxes = [];
  for (let chbox of checkboxes) {
    if (chbox.checked) {
      seletedboxes.push(chbox.value);
    }
  }
  requestHttp(seletedboxes);
}

function requestHttp(seletedboxes) {
  const req = {
    answers: seletedboxes,
  };

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
        result.innerHTML = "정답";
      } else {
        result.innerHTML = "오답";
      }
    })
    .catch((err) => {
      throw err;
    });
}
