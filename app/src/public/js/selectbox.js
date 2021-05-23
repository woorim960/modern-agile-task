const selectBox = document.getElementsByName('selectbox')[0];
const button = document.getElementById("submit-btn");
const span = document.getElementById("result");
  
button.addEventListener("click", () => {
    fetch("/api/selectbox/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            answer : selectBox.value
        }),
      })
      .then((response) => response.json())
      .then((isAnswer) => span.innerHTML = isAnswer ? "정답" : "오답");
    });

    //                        {
    //       response.json().then(data => {
    //           if(data) span.innerHTML = "정답";
    //           else span.innerHTML = "오답";
    //       });
    //   })
