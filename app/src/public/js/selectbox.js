"use strict";

const selectBox = document.getElementsByName("selectbox")[0];
const submit = document.querySelector("#submit-btn");
const result = document.querySelector("#result");

submit.addEventListener("click", selectHandler);

function selectHandler() {
  for (let selBox of selectBox) {
    if (selBox.selected) return requestHTTP(selBox.value);
  }
}

function requestHTTP(selectBox) {
  const req = {
    answer: selectBox,
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
      if (res) result.innerHTML = "정답";
      else result.innerHTML = "오답";
    })
    .catch((err) => {
      throw err;
    });
}
