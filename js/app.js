const inputTextEl = document.querySelector("#text");
const inputDateEl = document.querySelector("#date");
const todoContentEl = document.querySelector("#todo-content");
const formEl = document.querySelector("#form");

let todoObjData = [];
let selectObj = null;

function reset() {
  inputTextEl.value = "";
  inputDateEl.value = "";
}

function generateToDo(data) {
  todoContentEl.innerHTML = "";
  data.forEach((el, index) => {
    todoContentEl.innerHTML += `
        <div id="todo-${el.id}" class="todo">
          <p class="${el.checked ? "checked" : ""}"><span>${index + 1}</span>.${
      el.text
    }</p>
          <span class="${el.checked ? "checked" : ""}">${el.date}</span>
          <div class="todo-inputs">
          <button id="update" onclick="selectFunction(${el.id})">update</button>
          <button id="delete" onclick="deleteToDo(${el.id})">delete</button>
          <input type="checkbox" ${
            el.checked ? "checked" : ""
          } name="check" id="checkbox" onclick="checkboxFunction(${el.id})"/>
          </div>
          `;
  });
  if (todoObjData.length > 0) {
    document.querySelector(".not-found").classList.add("not-found-none");
  } else {
    document.querySelector(".not-found").classList.remove("not-found-none");
  }
}

function checkboxFunction(id) {
  const obj = todoObjData.find((el) => el.id === id);
  obj.checked = !obj.checked;
  generateToDo(todoObjData);
}

function createToDo() {
  let obj = {
    id: Date.now(),
    text: inputTextEl.value,
    date: inputDateEl.value,
    checked: false,
  };
  todoObjData = [obj, ...todoObjData];
  reset();
  generateToDo(todoObjData);
  Swal.fire({
    title: "User successfuly added!",
    icon: "Successe",
  });
}

function deleteToDo(id) {
  Swal.fire({
    title: "Are you sure",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirButtonColo: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete if!",
  }).then((result) => {
    if (result.isConfirmed) {
      todoObjData = todoObjData.filter((el) => el.id !== id);
      document.querySelector(`#todo-${id}`).classList.add("animate");

      setTimeout(() => {
        generateToDo(todoObjData);
      }, 400);
      // Swal.fire({
      //   title: " User successful delete!",
      //   icon: "success",
      // });
    }
  });
}

function selectFunction(id) {
  selectObj = todoObjData.find((el) => el.id === id);
  [inputTextEl.value, inputDateEl.value] = [selectObj.text, selectObj.date];
}

function updateSelectToDo() {
  todoObjData = todoObjData.map((el) => {
    if (selectObj.id == el.id) {
      return {
        ...el,
        text: inputTextEl.value,
        date: inputDateEl.value,
      };
    } else {
      return el;
    }
  });
  reset();
  generateToDo(todoObjData);
  Swal.fire({
    title: "User successfuly added!",
    icon: "Successe",
  });
}
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  if (selectObj) {
    updateSelectToDo(e);
  } else {
    createToDo(e);
  }
});
generateToDo(todoObjData);
