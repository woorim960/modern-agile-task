"use strict";

const enrollmentButton = document.querySelector("div button");
const tbody = document.querySelector("tbody");
const name = document.querySelector("#name");
const description = document.querySelector("#description");

enrollmentButton.addEventListener("click", () => {
    fetch("/api/todolist", {
        method: "POST",
        headers: {
            "Content-type" : "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            name: name.value,
            description: description.value,
        })
    })
    .then(res => res.text())
    .then(res => {
        if (name.value && description.value) {
            const tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${name.value}</td>
            <td>${description.value}</td>
            <td><button id="td-update">수정</button></td>
            <td><button id="td-delete">삭제</button></td>
            `;
            tbody.appendChild(tr);
            tr.setAttribute("index", res);
        }
        else alert("To Do 등록에 실패하셨습니다.");
    })
})

tbody.addEventListener("click", (e) => {
    const index = e.target.parentNode.parentNode.getAttribute("index");
    if (e.target.id === "td-update") dataUpdate(e, index);
    if (e.target.id === "td-delete") dataDelete(e, index);
})

function dataUpdate(e, index) {
    fetch(`/api/todolist/${index}`, {
        method: "PUT",
        headers: {
            "Content-type" : "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            name: name.value,
            description: description.value,
        })
    })
    .then(res => res.text())
    .then(res => {
        if (res === index) {
            e.target.parentNode.parentNode.innerHTML = `
            <td>${name.value}</td>
            <td>${description.value}</td>
            <td><button id="td-update">수정</button></td>
            <td><button id="td-delete">삭제</button></td>
            `;
        }
        else alert("To Do 수정에 실패하셨습니다.");
    })
}

function dataDelete(e, index) {
    fetch(`/api/todolist/${index}`, {
        method: "DELETE"
    })
    .then(res => res.text())
    .then(res => {
        if (res === index) e.target.parentNode.parentNode.remove();
        else alert("To Do 삭제에 실패하였습니다.")
    })
}