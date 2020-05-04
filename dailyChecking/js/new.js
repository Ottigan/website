"use strict";

const newTable = document.querySelector("#new-table"),
  newCasino = document.querySelector("#new-casino"),
  addTableBtn = document.querySelector("#add-table"),
  addCasinoBtn = document.querySelector("#add-casino"),
  tableList = document.querySelector("#table-list"),
  casinoList = document.querySelector("#casino-list");

addTableBtn.onclick = function () {
  let newTableValue = newTable.value;
  let empty = newTableValue.trim();

  if (!empty) {
    alert("Empty Value!");
    newTable.classList.add("invalid");
    newTable.focus();
  } else {
    newTable.value = "";
    newTable.classList.remove("invalid");
    addTableListItem(newTableValue);
  }
};

const addTableListItem = (item) => {
  const listItem = document.createElement("li");
  listItem.innerText = item;
  listItem.style.paddingLeft = "2px";
  listItem.classList.add("l-decoration", "flex", "jc-sb", "ai-c");
  listItem.innerHTML = `${item} <button style="width: 10%" type="button">x</button>`;
  tableList.prepend(listItem);
};

addCasinoBtn.onclick = function () {
  let newCasinoValue = newCasino.value;
  let empty = newCasinoValue.trim();

  if (!empty) {
    alert("Empty Value!");
    newCasino.classList.add("invalid");
    newCasino.focus();
  } else {
    newCasino.value = "";
    newCasino.classList.remove("invalid");
    addCasinoListItem(newCasinoValue);
  }
};

const addCasinoListItem = (item) => {
  const listItem = document.createElement("li");
  listItem.innerText = item;
  listItem.style.paddingLeft = "2px";
  listItem.classList.add("l-decoration", "flex", "jc-sb", "ai-c");
  listItem.innerHTML = `${item} <button style="width: 10%" type="button">x</button>`;
  casinoList.prepend(listItem);
};
