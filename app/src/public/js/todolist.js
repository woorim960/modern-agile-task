'use strict';

const name = document.querySelector('#name');
const description = document.querySelector('#description');
const SUBMIT_URL = '/api/todolist';
const enroll = document.querySelector('button');
// const table = document.querySelector('table');
const tbody = document.querySelector('#table table');
let index;
let code;

enroll.addEventListener('click', () => {
  const config = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ name: name.value, description: description.value }),
  };

  fetch(SUBMIT_URL, config)
    .then((res) => res.text())
    .then((data) => {
      if (data) {
        const newTr = document.createElement('tr');
        newTr.setAttribute('index', data);
        newTr.innerHTML = `
        <td>${name.value}</td>
        <td>${description.value}</td>
        <td><button id="td-update">수정</button></td>
        <td><button id="td-delete">삭제</button></td>
        `;
        tbody.appendChild(newTr);
      }
    });
});

table.addEventListener('click', (e) => {
  const target = e.target;
  const tr = e.target.parentNode.parentNode;
  if (target.id === 'td-update') return update(tr);
  if (target.id === 'td-delete') return deleteTr(tr);
});

function update(tr) {
  const index = tr.getAttribute('index');
  const config = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ name: name.value, description: description.value }),
  };

  fetch(`/api/todolist/${index}`, config)
    .then((res) => res.text())
    .then((data) => {
      if (index) {
        tr.childNodes[1].innerHTML = name.value;
        tr.childNodes[3].innerHTML = description.value;
      }
    });
}

function deleteTr(tr) {
  const index = tr.getAttribute('index');
  const config = {
    method: 'DELETE',
  };
  fetch(`/api/todolist/${index}`, config)
    .then((res) => res.text())
    .then((data) => {
      tr.remove();
    });
}
