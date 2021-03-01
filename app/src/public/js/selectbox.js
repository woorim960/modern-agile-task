"use strict";

const selectBox = document.querySelector('select');
const submitBtn = document.querySelector('#submit-btn');
const resultSpan = document.querySelector('#result');

const URI = '/api/selectbox/submit';

//fetch
// submitBtn.addEventListener('click', () => {
//     const value = {
//         answer: selectBox.value,
//     }

//     fetch(URI, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json' 
//         },
//         body: JSON.stringify(value),
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data) resultSpan.innerHTML = '정답';
//         else resultSpan.innerHTML = '오답';
//     });
// });

//async/await 
submitBtn.addEventListener('click', actionSumbit);

async function actionSumbit() {
    const value = {
        answer: selectBox.value,
    }

    const data = await fetch(URI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(value),
        })
        .then(response => response.json());
    
        if (data) resultSpan.innerHTML = '정답';
        else resultSpan.innerHTML = '오답';
}