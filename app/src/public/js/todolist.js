"use strict";
const userName = document.querySelector('#name');
const description = document.querySelector('#description');
const enrollBtn = document.querySelector('button');
const table = document.querySelector('table');
let index = '';

//테이블생성 함수
function createTable(index) {
    let row = table.insertRow(table.length);
    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);
    let cell3 = row.insertCell(3);
    cell0.innerHTML = userName.value;
    cell1.innerHTML = description.value;
    cell2.innerHTML = '<button id="td-update">수정</button>';
    cell3.innerHTML = '<button id="td-delete">삭제</button>';
    row.setAttribute("index", index)
};

//수정버튼 
function updateTable(e) {
    const updateIndex = e.target.parentElement.parentElement.getAttribute('index');
    fetch(`/api/todolist/${updateIndex}`, {
        method : 'PUT',
        headrs : {
            'Content-type' : 'application/json; charset=utf-8' 
        },
        body : JSON.stringify({
            name : userName.value,
            description : description.value
        })
    })
    .then((res) => res.text())
    .then(() => {
        e.target.parentElement.parentElement.childNodes[0].textContent = userName.value;
        e.target.parentElement.parentElement.childNodes[1].textContent = description.value;
    })
}

//삭제버튼
function deleteTable(e) {
    const updateIndex = e.target.parentElement.parentElement.getAttribute('index');
    fetch(`/api/todolist/${updateIndex}`, {
        method : 'DELETE',
    })
    .then((res) => res.text())
    .then((index) => {
        if (index) e.target.parentElement.parentElement.remove()
        else alert('삭제 실패')
    })
}


//등록버튼
enrollBtn.addEventListener('click', () => {
    fetch('/api/todolist', {
        method : 'POST',
        headrs : {
            'Content-type' : 'application/json; charset=utf-8'
        },
        body : JSON.stringify({
            name : userName.value,
            description : description.value
        })
    })
    .then((res) => res.text())
    .then((index) => {
        if (userName.value.length !== 0 && description.value.length !== 0) {
            createTable(index)
        }
        else alert('실패');
    })
})


table.addEventListener('click', (e) => {
    if (e.target.id === 'td-update') updateTable(e)
    else if (e.target.id === 'td-delete') deleteTable(e)
})