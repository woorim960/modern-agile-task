"use strict";
const checkBoxInputs = document.querySelectorAll('#checkbox label input');
const submitBtn = document.querySelector('#submit_btn');
const result = document.querySelector('#result');

submitBtn.addEventListener('click', () => { 
    const answers = [];

    checkBoxInputs.forEach(input => {
        if (input.checked) answers.push(input.value);
    })

    fetch('/api/checkbox/submit', {
	    method : "POST",
	    headers : {
		    'Content-Type' : "application/json; charset=utf-8", 
        },
	    body : JSON.stringify({
            answers,
        })
    })
      .then((res) => res.json())
      .then((isAnswer) => result.innerHTML = isAnswer ? "정답" : "오답");
})

/*submitBtn.addEventListener('click', () => { 
    const body = {
        answers : [],
    }
    const { answers } = body

    checkBoxInputs.forEach(input => {
        if (input.checked) answers.push(input.value);
    })

    fetch('/api/checkbox/submit', {
	    method : "POST",
	    headers : {
		    'Content-Type' : "application/json; charset=utf-8", 
        },
	    body : JSON.stringify(body)
    })
      .then((res) => res.json())
      .then((isAnswer) => result.innerHTML = isAnswer ? "정답" : "오답");
})*/
