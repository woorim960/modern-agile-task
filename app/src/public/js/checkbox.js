"use strict";

const button = document.querySelector("#submit_btn"),
  result = document.querySelector("#result");

function run() {
  button.addEventListener("click", choice);
}

const choice = () => {
  const answers = [];
  const query = 'input[type="checkbox"]:checked';
  const checked = document.querySelectorAll(query);
  for (let i = 0; i < checked.length; i++) {
    answers.push(checked[i].value);
  }
  const data = { answers };
  const post = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const requestChecked = (post) => {
    fetch("/api/checkbox/submit", post)
      .then((res) => res.json())
      .then((res) => resultChecked(res));
  };
  const resultChecked = (res) => {
    if (res) return (result.innerText = "정답");
    result.innerText = "오답";
  };
  requestChecked(post);
};

run();
