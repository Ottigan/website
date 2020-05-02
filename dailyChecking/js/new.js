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
    newTable.focus();
  } else {
    newTable.value = "";
    addTableListItem(newTableValue);
  }
};

const addTableListItem = (item) => {
  const listItem = document.createElement("li");
  listItem.innerText = item;
  listItem.style.paddingLeft = "2px";
  listItem.classList.add("l-decoration", "flex", "jc-sb", "ai-c");
  listItem.innerHTML = `${item} <button style="width: 10%" type="button">x</button>`;
  tableList.append(listItem);
};

addCasinoBtn.onclick = function () {
  let newCasinoValue = newCasino.value;
  addCasinoLiItem(newCasinoValue);
};

const addCasinoLiItem = (item) => {
  const liItem = document.createElement("li");
  liItem.innerText = item;
  // liItem.classList.add("");
  casinoList.append(liItem);
};
