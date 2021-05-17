const selectList = document.getElementsByName("selectbox")[0];
const submitBtn = document.getElementById("submit-btn");
const submitResult = document.getElementById("result");

submitBtn.addEventListener("click", () => {
    fetch('/api/selectbox/submit', {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            answer: selectList.value
        }),
    })
    .then(res => res.json())
    .then(isAnswer => {
        if (isAnswer) submitResult.innerHTML = "정답";
        else submitResult.innerHTML = "오답";
    })
});
