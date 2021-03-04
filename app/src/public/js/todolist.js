"use strict";


const name = document.querySelector("#name");
const description = document.querySelector("#description");
const btn = document.querySelector("button");
const table = document.querySelector("table");
const thname = document.querySelector(".th-name");
const thdesc = document.querySelector(".th-description");
const thupdate = document.querySelector(".th-update");
const thdelete = document.querySelector(".th-delete");


btn.addEventListener("click", output);
table.addEventListener("click", clickHandler);

function clickHandler(e) {
    const target = e.target;
    const tr = target.parentNode.parentNode
    if (target.id === "td-update") return update(tr);
    if (target.id === "td-delete") return deletes(tr);
}

function output() {
   
    const req = {
        name:name.value,
        description: description.value
    };


    fetch("/api/todolist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((res) => res.text())
      .then((index) => {
          console.log(index);
        if (index) {
            const tr = document.createElement("tr");
            const html = `
                <td>${req.name}</td>
                <td>${req.description}</td>
                <td><button id="td-update">수정</button></td>
                <td><button id="td-delete">삭제</button></td>
            `
            tr.innerHTML = html;
            tr.setAttribute("index", index);

            table.appendChild(tr);
        } else {
            alert("to do 등록 실패")
        }
      })
} 


function update(tr) {
    let index = tr.getAttribute("index");
    
    const req = {
        name:name.value,
        description: description.value
    };


    fetch(`/api/todolist/${index}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((res) => res.text())
      .then((index) => {
        if (index) {
            const html = `
            <td>${req.name}</td>
            <td>${req.description}</td>
            <td><button id="td-update">수정</button></td>
            <td><button id="td-delete">삭제</button></td>
            `

            tr.innerHTML = html;
        } else {
            alert("to do 수정 실패")
        }
      })
} 

function deletes(tr) {
    let index = tr.getAttribute("index");
    
    const req = {
        name:name.value,
        description: description.value
    };


    fetch(`/api/todolist/${index}`)
      .then((res) => res.text())
      .then((index) => {
        if (index) {
            tr.remove();
        } else {
            alert("to do 삭제 실패")
        }
      })
} 