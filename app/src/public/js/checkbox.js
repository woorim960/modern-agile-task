const ㅡcheckBox = document.querySelectorAll("#checkbox label input");

const submitBtn = document.querySelector("#submit_btn");
const submitResult = document.querySelector("#result");

submitBtn.addEventListener("click", () => {
    const checkedThings = [];
    for (let i = 0; i < checkBox.length; i++) {
        if (checkBox[i].checked) {
            checkedThings.push(checkBox[i].value)  
        }
    }
    fetch('/api/checkbox/submit', {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json" 
        },
        body: JSON.stringify({
           answers: checkedThings,
        }),
    })
    .then(res => res.json())
    .then(isAnswer => {
        if (isAnswer) submitResult.innerHTML = "정답";
        else submitResult.innerHTML = "오답";
    })
});
