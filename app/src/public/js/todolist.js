"use strict";
const ID = document.querySelector("#name"),
    des = document.querySelector("#description"),
    btn = document.querySelector("body div:nth-child(1) button"),
    table = document.querySelector("#table table tbody");

let index = "";

function newTable(index) {
    const tbody = document.querySelector("#table table tbody");
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${ID.value}</td>
        <td>${des.value}</td>
        <td><button id="td-update">수정</button></td>
        <td><button id="td-delete">삭제</button></td>
    `;

    tr.setAttribute("index", index);
    tbody.appendChild(tr);
}

function del(e) {
    const delIndex = e.target.parentNode.parentNode.getAttribute("index");
    fetch(`/api/todolist/${delIndex}`,{
        method: "DELETE"
    })
    .then((res) => res.text())
    .then((indexData) => {
        console.log(indexData)
        if (delIndex === indexData) {
            e.target.parentElement.parentElement.remove();
        } else console.log("To Do 삭제에 실패하셨습니다.")
    })
}

function update(e) {
    const toDo = {
        name: ID.value,
        description: des.value
     };

    const upIndex = e.target.parentNode.parentNode.getAttribute("index");
    const headers = {'Content-Type' : 'application/json; charset=utf-8',};
    const obj = {
        method : 'PUT',
        headers,
        body : JSON.stringify(toDo)
    };
    fetch(`/api/todolist/${upIndex}`, obj)
        .then((res) => res.text())
        .then((indexData) => {
            if(indexData) {
                e.target.parentElement.parentElement.childNodes[0].innerText = ID.value;
                e.target.parentElement.parentElement.childNodes[1].innerText = des.value;
            } else console.log("To Do 수정에 실패하셨습니다.");
        });
}

btn.addEventListener("click", () => {
    const toDo = {
        name: ID.value,
        description: des.value
     };

    newToDo(toDo); 
});


const newToDo = (toDo) => {
    console.log(toDo);

    const head = {'Content-Type' : 'application/json; charset=utf-8',};
    const obj = {
        method : 'POST',
        headers : head,
        body : JSON.stringify(toDo)
    };
    
    fetch("/api/todolist", obj)
        .then((res) => res.text())
        .then((indexData) => {
            if(indexData) {
                index = indexData;
                newTable(index);
            } else console.log("To Do 등록에 실패하셨습니다.");
        });
} 

table.addEventListener("click", (e) => {
    delAndUp(e);
});

const delAndUp = (e) => {
    console.log(e.target);
    if(e.target.id === 'td-delete') {
        del(e);
    }

    if(e.target.id === 'td-update') {
        update(e);
    }
}