"use strict";

const nameInput = document.querySelector("#name");
const descInput = document.querySelector("#description");
const btn = document.querySelector('button');
const tableDiv = document.querySelector('#table');
const table = document.querySelector('#table table');

const URI = '/api/todolist';

let toDoListData = '';
let editData = '';
let deleteData = '';

btn.addEventListener('click', submitTodoList);

async function submitTodoList() {
    const value = {
        name: nameInput.value,
        description: descInput.value 
    };

    console.log(value);

    toDoListData = await fetch(URI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
    })
    .then(res => res.text());

    console.log(toDoListData);

    if (toDoListData) createTodoItem(value);
}

function createTodoItem(value) {
    //tr
    const newTr = document.createElement("tr");

    //td
    const newNameItem = document.createElement("td");
    const newDescItem = document.createElement("td");
    const newUpdateItem = document.createElement('td');
    const newDeleteItem = document.createElement('td');

    //button
    const newUpdateBtn = document.createElement('button');
    const newDeleteBtn = document.createElement('button');

    //context
    const newNameContext = document.createTextNode(`${value.name}`);
    const newDescContext = document.createTextNode(`${value.description}`);
    const editContext = document.createTextNode(`수정`);
    const deleteContext = document.createTextNode(`삭제`);

    newTr.setAttribute('index', toDoListData);
    newUpdateBtn.setAttribute('id', 'td-update');
    newDeleteBtn.setAttribute('id', 'td-delete');

    table.appendChild(newTr);

    newUpdateItem.appendChild(newUpdateBtn);
    newDeleteItem.appendChild(newDeleteBtn);

    newUpdateBtn.appendChild(editContext);
    newDeleteBtn.appendChild(deleteContext);

    newNameItem.appendChild(newNameContext);
    newDescItem.appendChild(newDescContext);
    newTr.appendChild(newNameItem);
    newTr.appendChild(newDescItem);
    newTr.appendChild(newUpdateItem);
    newTr.appendChild(newDeleteItem);

    //button
    const updateBtn = document.querySelectorAll('#td-update');
    const deleteBtn = document.querySelectorAll('#td-delete');

    updateBtn.forEach(el => {
        el.addEventListener('click', async () => {
            const value = {
                name: nameInput.value,
                description: descInput.value 
            };
            
            const parentTr = el.parentNode.parentNode;
            const parentTrIndex = parentTr.getAttribute('index');
            const editName = parentTr.querySelectorAll('td')[0];
            const editDesc = parentTr.querySelectorAll('td')[1];

            editData = await fetch(`/api/todolist/${parentTrIndex}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(value),
            }).then(res => res.text());
    
            if (editData === parentTrIndex) {
                editName.innerHTML = `${value.name}`;
                editDesc.innerHTML = `${value.description}`;
            }
        });
    });

    deleteBtn.forEach(el => {
        el.addEventListener('click', async () => {
            const parentTalbe = el.parentNode.parentNode.parentNode;
            const parentTr = el.parentNode.parentNode;
            const parentTrIndex = parentTr.getAttribute('index');
            
            console.log(parentTalbe);

            deleteData = await fetch(`/api/todolist/${parentTrIndex}`, {
                method: 'DELETE',
            })
            .then(res => res.text())
            .then(data => data);

            if(deleteData === parentTrIndex) {
                parentTalbe.removeChild(parentTr);
            }
        })
    })
    
}
