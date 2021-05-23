const fname = document.querySelector('#name');
const description = document.querySelector('#description');
const table = document.querySelector('#table');
const button = document.querySelector('button');
const tbody = document.querySelector('tbody');

button.addEventListener("click", () => {
    fetch("/api/todolist", {
        method : "POST",
        headers : {
          "Content-Type" : "application/json; charset=utf-8",
        },
        body : JSON.stringify({
            name : fname.value,
            description : description.value
        }),
      })
      .then((response) => response.text())
      .then((index) => index ? append(index) : alert("To Do 등록에 실패하셨습니다."))
    });

function append(index) {
    const tr = document.createElement('tr');
    tr.setAttribute('index', index);
    tbody.appendChild(tr);
    tr.innerHTML = (
        `<td>${fname.value}</td>
        <td>${description.value}</td>
        <td><button id="td-update">수정</button></td>
        <td><button id="td-delete">삭제</button></td>`
    )
}

table.addEventListener("click", (e) => {
    const index = e.target.parentNode.parentNode.getAttribute('index');
    if (e.target.id === "td-update") newUpdate(e);
    else if (e.target.id === "td-delete") newDelete(e);
    });


function newUpdate(e) {
    const index = e.target.parentNode.parentNode.getAttribute('index');
    fetch(`/api/todolist/${index}`, {
        method : "PUT",
        headers : {
          "Content-Type" : "application/json; charset=utf-8",
        },
        body : JSON.stringify({
            name : fname.value,
            description : description.value
        }),
      })
      .then((response) => response.text())
      .then(result => {
          if (result) {
            e.target.parentNode.parentNode.innerHTML = (
              `<td>${fname.value}</td>
              <td>${description.value}</td>
              <td><button id="td-update">수정</button></td>
              <td><button id="td-delete">삭제</button></td>`);
          }
          else {
            alert("To Do 수정에 실패하셨습니다.")
          }
          
      });
}


function newDelete(e) {
  const index = e.target.parentNode.parentNode.getAttribute('index');
    console.log("newDelete");
    fetch(`/api/todolist/${index}`, {
        method : "DELETE",
      })
      .then((response) => response.text())
      .then(result => {
          if (result) {
            e.target.parentNode.parentNode.remove();
          }
          else {
            alert("To Do 삭제에 실패하셨습니다.")
          }
          
      });
}


