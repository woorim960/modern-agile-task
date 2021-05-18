"use strict";

const button = document.querySelector("#submit_btn"),
    output = document.querySelector("#result")
    

button.addEventListener("click", () => {
    const checkedValue = [];

    for (let i = 1; i < 6; i++) {
        const checkbox = document.querySelector(`#checkbox > label:nth-child(${i}) > input[type=checkbox]`)
        if(checkbox.checked) checkedValue.push(checkbox.value);
    }  request(checkedValue);
});

const request = (checkedValue) => {

    const data = {answers : checkedValue},
    head = {'Content-Type' : 'application/json; charset=utf-8',}

    const obj = {
        method : 'POST',
        headers : head,
        body : JSON.stringify(data)
    }
    
    fetch("/api/checkbox/submit", obj)
        .then((res) => res.json())
        .then((data) => {
            data ? output.innerText = "정답" : output.innerText = "오답"
        });
} 
