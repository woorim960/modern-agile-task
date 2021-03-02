"use strict";

const checkBoxInputs = document.querySelectorAll('#checkbox label input');
const submitBtn = document.querySelector('#submit_btn');
const resultSpan = document.querySelector('#result');

const URI = '/api/checkbox/submit';

submitBtn.addEventListener('click', () => {
    const value = {
        answers: [],
    };
    const { answers } = value;

    checkBoxInputs.forEach(input => {
        if (input.checked) answers.push(input.value);
    });

    console.log(value);

    fetch(URI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(value),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data) resultSpan.innerHTML = '정답';
        else resultSpan.innerHTML = '오답';
    });
})