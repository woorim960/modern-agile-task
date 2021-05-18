"use strict";
const checkBox = document.querySelectorAll("#checkbox label input");
const submitBtn = document.querySelector("#submit_btn");
const result = document.querySelector("#result");

submitBtn.addEventListener("click", onSubmit);




function onSubmit() {
    const checkValue = {
        answers : []
    };
    const { answers } = checkValue;

   

    checkBox.forEach(input => {
        if (input.checked) answers.push(input.value);
    });

    fetch('/api/checkbox/submit', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(checkValue),
    })
    .then(res => res.json())
    .then(isAnswer => {
        result.innerHTML = isAnswer ?  '정답' : '오답';
    });
}


    
 
