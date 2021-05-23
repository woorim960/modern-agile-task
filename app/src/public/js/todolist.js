"use strict";
const id = document.querySelector("#name");
const description = document.querySelector("#description");
const btn = document.querySelector("button");
const table = document.querySelector("table");

btn.addEventListener("click", () => {
    const todolist = {
        name : id.value,
        description : description.value
    };

    fetch("/api/todolist", {
        method : "POST",
        headers : {"Content-Type" : "application/json; charset = utf-8"},
        body : JSON.stringify(todolist)
    })
        .then((response) => response.text())
        .then((answer) =>  {
            if(answer === "To do 등록에 실패하셨습니다.") {
                alert(answer)
            } else {
                addList(answer)
            }
        })
});

function addList(value) {
    const newtr = table.insertRow(-1);
    const cell1 = newtr.insertCell(0);
    const cell2 = newtr.insertCell(1);
    const cell3 = newtr.insertCell(2);
    const cell4 = newtr.insertCell(3);
    newtr.setAttribute("index",value);
    const updateBtn = "<button> 수정 </button>";
    const deleteBtn = "<button> 삭제 </button>";
    cell1.innerText = id.value;
    cell2.innerText = description.value;
    cell3.innerHTML = updateBtn;
    cell4.innerHTML = deleteBtn;

    cell4.addEventListener("click", () => {
        fetch(`/api/todolist/${value}`, {
            method : "DELETE"
            })
            .then((response) => response.text())
            .then((index) => {
                if(index === "To do 삭제에 실패하셨습니다.") {
                    alert(index);
                } else {
                    newtr.remove(index);
                }
                })
            })

    cell3.addEventListener("click", () => {
        fetch(`/api/todolist/${value}`, {
            method : "PUT",
            headers : {"Content-Type" : "application/json; charset = utf-8"},
            body : JSON.stringify({
                name : id.value,
                description : description.value
            })
        })
        .then((response) => response.text())
        .then((index) => {
            if (index === "To Do 수정에 실패하셨습니다."){
                alert(index);
            } else {
                newtr.childNodes[0].textContent= id.value;
                newtr.childNodes[1].textContent = description.value;
            }
    })
})
}