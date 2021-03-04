"use strict";

const name = document.querySelector("#name");
const description = document.querySelector("#description");
const table = document.querySelector("table");
const btn = document.querySelector("button");

btn.addEventListener("click", register);
table.addEventListener("click", choiceTarget);

function register() {
    const req = {
        name : name.value,
        description: description.value
    };

    const URL = "/api/todolist";

    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(req)
    })
    .then((res) => res.text())
    .then((res) => {
        insertTalbe(req, res);
    })
    .catch((err) => {
        throw err;
    });
}

function insertTalbe(req, index) {
    const tr = document.createElement("tr");
    const html = `<td>${req.name}</td>
                <td>${req.description}</td>
                <td><button id="td-update">수정</button></td>
                <td><button id="td-delete">삭제</button></td>`;
                
    tr.innerHTML = html;
    table.appendChild(tr);
    tr.setAttribute("index", index);
}

function choiceTarget(event) {
    const target = event.target;
    if (target.id === "td-update") {
        update(target);
    } else if (target.id === "td-delete") {
        remove(target);
    }
}

function update(btn) {
    const tr = btn.parentNode.parentNode;
    const index = tr.getAttribute("index");

    const req = {
        name : name.value,
        description: description.value
    };

    const URL = `/api/todolist/${index}`;
    fetch(URL, {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(req)
    })
    .then((res) => res.text())
    .then((res) => {
        updateTable(tr, req);
    })
    .catch((err) => {
        throw err;
    })
}

function updateTable(tr, req) {
    const html = `<td>${req.name}</td>
                <td>${req.description}</td>
                <td><button id="td-update">수정</button></td>
                <td><button id="td-delete">삭제</button></td>`;
                
    tr.innerHTML = html;
}

function remove(btn) {
    const tr = btn.parentNode.parentNode;
    const index = tr.getAttribute("index");
    const URL = `/api/todolist/${index}`;
    fetch(URL, {
        method: "DELETE"
    })
    .then((res) => res.text())
    .then((res) => {
        removeTable(tr);
    })
    .catch((err) => {
        throw err;
    });
}

function removeTable(tr) {
    table.removeChild(tr);
}