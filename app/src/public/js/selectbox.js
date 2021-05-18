const selectList = document.querySelector("selectbox");  
const submitBtn = document.querySelector("submit-btn");
const submitResult = document.querySelector("result");

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
