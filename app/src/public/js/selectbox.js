"use strict";

const output = document.getElementById('result');
const button = document.getElementById('submit-btn');
const select = document.getElementsByName('selectbox')[0];


const request = (selectedValue) => {
    const data = {
        answer: selectedValue
    };

    fetch("/api/selectbox/submit", {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(data),
    })
    .then((res) => res.json())
    .then((data) => {
        if(data) output.innerText = "정답";
        else if (!data) output.innerText = "오답";
    });
} 

button.addEventListener("click", () => {
    const selectedValue = select.value;
    request(selectedValue)
});







