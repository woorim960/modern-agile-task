"use strict";

const selectBox = document.getElementsByName("selectbox")[0];
const submit = document.querySelector("#submit_btn");
const result = document.querySelector("#result");
console.log(selectBox.options[selectBox.selectedIndex]);
submit.addEventListener("click", selectHandler);

function selectHandler() {
  for (let selBox of selectBox) {
    if (selBox.selected) return requestHTTP([selBox.value]);
  }
}

function requestHTTP(selectedBox) {
  const req = {
    answers: selectedBox,
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
      if (res) result.innerHTML = "결과: 정답입니다.";
      else result.innerHTML = "결과: 오답입니다.";
    })
    .catch((err) => {
      throw err;
    });
}
