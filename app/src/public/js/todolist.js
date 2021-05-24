"use strict";
const name = document.querySelector("#name");  
const description = document.querySelector("#description");
const enrollBtn = document.querySelector("button");
const table = document.querySelector("#table table");

enrollBtn.addEventListener("click", () => {
    fetch('/api/todolist', {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json" 
        },
        body: JSON.stringify({
            name: name.value,
            description: description.value
        }),
    })
    .then(res => res.text())
    .then(index => {
        if(index) {
            const newRow = table.insertRow(-1);
            newRow.setAttribute("index", index);
            const newCell1 = newRow.insertCell(0);
            const newCell2 = newRow.insertCell(1);
            const newCell3 = newRow.insertCell(2);
            const newCell4 = newRow.insertCell(3);

            newCell1.innerText = name.value;
            newCell2.innerText = description.value;
            newCell3.innerHTML = '<button id="td-update"> 수정 </button>';
            newCell4.innerHTML = '<button id="td-delete"> 삭제 </button>';  
        }
        else alert("To Do 등록에 실패하셨습니다.")
    })
});

table.addEventListener("click", (e) => {
    const target = e.target;
    const tr = target.parentElement.parentElement;
    if (target.id === "td-update") return update(tr);
    else if (target.id === "td-delete") return deletebtn(tr);
});

function update(tr) {
    const index = tr.getAttribute("index");
    fetch(`/api/todolist/${index}`, {
        method: 'PUT',
        headers: {
            "Content-Type" : "application/json" 
        },
        body: JSON.stringify({
            name: name.value,
            description: description.value,
        }),
    })
    .then(res => res.text())
    .then(index => {
        if(index) {
            tr.childNodes[0].innerHTML = name.value;
            tr.childNodes[1].innerHTML = description.value;
        }
        else alert("To Do 등록에 실패하셨습니다.");
    })
};

function deletebtn(tr) {
    const index = tr.getAttribute("index");
    fetch(`/api/todolist/${index}`, {
        method: 'DELETE',
        headers: {
            "Content-Type" : "application/json" 
        },
    })
    .then(res => res.text())
    .then(index => {
        if(index) {
            tr.childNodes[0].innerHTML = "";
            tr.childNodes[1].innerHTML = "";
            tr.childNodes[2].innerHTML = "";
            tr.childNodes[3].innerHTML = "";          
        }
        else alert("To Do 등록에 실패하셨습니다.");
    })
};

