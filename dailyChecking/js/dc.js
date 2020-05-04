`use strict`;

const addBtn1 = document.querySelector("#addbutton1"),
  counter1 = document.querySelector("#counter1"),
  target1 = document.querySelector("#target1"),
  addBtn2 = document.querySelector("#addbutton2"),
  counter2 = document.querySelector("#counter2"),
  target2 = document.querySelector("#target2"),
  addBtn3 = document.querySelector("#addbutton3"),
  counter3 = document.querySelector("#counter3"),
  target3 = document.querySelector("#target3"),
  addBtn4 = document.querySelector("#addbutton4"),
  counter4 = document.querySelector("#counter4"),
  target4 = document.querySelector("#target4");

addBtn1.onclick = function () {
  let counterValue = counter1.innerHTML;
  updatecounter1(counterValue);
};

function updatecounter1(value) {
  let x = value;
  let y = target1.value;
  let z = target1.placeholder;
  x++;
  counter1.innerHTML = x;
  if (y > 0) {
    if (x >= y) {
      counter1.classList.add("valid");
    }
  } else {
    if (x >= z) {
      counter1.classList.add("valid");
    }
  }
}

addBtn2.onclick = function () {
  let counterValue = counter2.innerHTML;
  updatecounter2(counterValue);
};

function updatecounter2(value) {
  let x = value;
  let y = target2.value;
  let z = target2.placeholder;
  x++;
  counter2.innerHTML = x;
  if (y > 0) {
    if (x >= y) {
      counter2.classList.add("valid");
    }
  } else {
    if (x >= z) {
      counter2.classList.add("valid");
    }
  }
}

addBtn3.onclick = function () {
  let counterValue = counter3.innerHTML;
  updatecounter3(counterValue);
};

function updatecounter3(value) {
  let x = value;
  let y = target3.value;
  let z = target3.placeholder;
  x++;
  counter3.innerHTML = x;
  if (y > 0) {
    if (x >= y) {
      counter3.classList.add("valid");
    }
  } else {
    if (x >= z) {
      counter3.classList.add("valid");
    }
  }
}

addBtn4.onclick = function () {
  let counterValue = counter4.innerHTML;
  updatecounter4(counterValue);
};

function updatecounter4(value) {
  let x = value;
  let y = target4.value;
  let z = target4.placeholder;
  x++;
  counter4.innerHTML = x;
  if (y > 0) {
    if (x >= y) {
      counter4.classList.add("valid");
    }
  } else {
    if (x >= z) {
      counter4.classList.add("valid");
    }
  }
}
