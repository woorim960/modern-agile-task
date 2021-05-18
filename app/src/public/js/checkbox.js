const checkBox = document.querySelectorAll('#checkbox label input');
const button = document.querySelector("#submit_btn");
const span = document.querySelector("#result");


function add() {
    const boxes = [];
    for (let i = 0; i < checkBox.length; i++) {
        if (checkBox[i].checked)
            boxes.push(checkBox[i].value);
            console.log(boxes);
    }
    return boxes;
}

button.addEventListener("click", () => {
    fetch("/api/checkbox/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            answers : add()
        }),
      })
      .then((res) => res.json())
      .then((isAnswer) => span.innerHTML = isAnswer ? "정답" : "오답");
    });

