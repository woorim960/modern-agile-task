"use strict";

const checkboxes = document.querySelectorAll("#checkbox input");
const submit = document.querySelector("#submit_btn");

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

  fetch("/api/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      const result = document.querySelector("#result");
      if (res) {
        result.innerHTML = "결과: 정답입니다.";
      } else {
        result.innerHTML = "결과: 오답입니다.";
      }
    })
    .catch((err) => {
      throw err;
    });
}
