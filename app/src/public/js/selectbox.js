"use strict";

"use strict";

const options = document.querySelector("#selectbox"),
  button = document.querySelector("#submit-btn"),
  result = document.querySelector("#result");

function run() {
  button.addEventListener("click", choice);
}

const choice = () => {
  const data = { answer: options.value };

  const post = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const requestSelect = (post) => {
    fetch("/api/selectbox/submit", post)
      .then((res) => res.json())
      .then((res) => resultSelect(res));
  };

  const resultSelect = (res) => {
    if (res) return (result.innerText = "정답");
    result.innerText = "오답";
  };

  requestSelect(post);
};

run();
