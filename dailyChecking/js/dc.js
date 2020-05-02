`use strict`;

const addBtn1 = document.querySelector("#addbutton1"),
  counter1 = document.querySelector("#counter1"),
  addBtn2 = document.querySelector("#addbutton2"),
  counter2 = document.querySelector("#counter2"),
  addBtn3 = document.querySelector("#addbutton3"),
  counter3 = document.querySelector("#counter3"),
  addBtn4 = document.querySelector("#addbutton4"),
  counter4 = document.querySelector("#counter4");

addBtn1.onclick = function () {
  let counterValue = counter1.innerHTML;
  updatecounter1(counterValue);
};

function updatecounter1(value) {
  let x = value;
  x++;
  counter1.innerHTML = x;
}

addBtn2.onclick = function () {
  let counterValue = counter2.innerHTML;
  updatecounter2(counterValue);
};

function updatecounter2(value) {
  let x = value;
  x++;
  counter2.innerHTML = x;
}

addBtn3.onclick = function () {
  let counterValue = counter3.innerHTML;
  updatecounter3(counterValue);
};

function updatecounter3(value) {
  let x = value;
  x++;
  counter3.innerHTML = x;
}

addBtn4.onclick = function () {
  let counterValue = counter4.innerHTML;
  updatecounter4(counterValue);
};

function updatecounter4(value) {
  let x = value;
  x++;
  counter4.innerHTML = x;
}
