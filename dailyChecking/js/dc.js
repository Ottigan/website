`use strict`;

const checkRows = document.querySelector('#checkRows'),
  rowManip = document.querySelector('#row-manipulator'),
  db = firebase.firestore();

const manipRows = (event) => {
  let target = event.target;
  let row = target.parentElement.previousElementSibling;
  if (target.innerHTML === 'Remove' && row.classList.contains('table-row')) {
    db.collection('dailyChecking')
      .doc('rows')
      .get()
      .then(function (doc) {
        let data = doc.data().rowcount;
        let objectArray = doc.data().rowObjects;
        objectArray.forEach((value) => console.log(value))
        let deleteObject = objectArray.find(value => value.id === data);
        if (data > 0) {
          db.collection('dailyChecking')
            .doc('rows').update({
              rowcount: firebase.firestore.FieldValue.increment(-1),
              rowObjects: firebase.firestore.FieldValue.arrayRemove(deleteObject)
            })
            .then(function () {
              row.remove();
            })
            .catch(function (error) {

            });
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
  } else if (target.innerHTML === 'Add') {
    db.collection('dailyChecking')
      .doc('rows').update({
        rowcount: firebase.firestore.FieldValue.increment(1)
      })
      .then(function () {
        const rowItem = document.createElement('form');
        rowItem.classList.add('flex', 'jc-c', 'table-row');
        rowItem.innerHTML = `<div style="margin: 0 3px;">
          <input type="text" id="table-list" />
        </div>
        <div style="margin: 0 3px;">
          <input name="platform" type="text" list="platforms" />
          <datalist id="platforms">
            <option value="iOS MHTML5"></option>
            <option value="Android MHTML5"></option>
            <option value="Windows Chrome"></option>
            <option value="MacOS Safari"></option>
            <option value="iOS Native"></option>
            <option value="Android Native"></option>
          </datalist>
        </div>
        <div style="margin: 0 3px;">
          <input type="text" name="" id="casino" />
        </div>
        <span class="counter">0</span>
        <input type="number" class="target" placeholder="10" maxlength="2" min="1" max="12" />
        <button class="submitButton" type="button">
          Submit
        </button>`;
        rowManip.before(rowItem);
        db.collection('dailyChecking')
          .doc('rows')
          .get()
          .then(function (doc) {
            let data = doc.data().rowcount;
            db.collection('dailyChecking')
              .doc('rows')
              .update({
                rowObjects: firebase.firestore.FieldValue.arrayUnion({
                  id: data,
                  name: "",
                  platform: "",
                  casino: ""
                }),
              })
              .then(function () {
                console.log('Row Object added');
              })
              .catch(function (error) {
                console.error('Error adding Object row: ', error);
              });
          })
          .catch(function (error) {
            console.log('Error getting document:', error);
          });
      })
      .catch(function (error) {
        console.error('Error adding a row: ', error);
      });
  }
};

checkRows.addEventListener('click', manipRows);

const updateCounter = (event) => {
  let target = event.target;

  //following IF statement meant to limit event interaction
  if (target.classList.contains("submitButton")) {
    let counter = target.previousElementSibling.previousElementSibling,
      goal = target.previousElementSibling,
      x = counter.innerHTML,
      y = goal.value,
      z = goal.placeholder;
    x++;
    counter.innerHTML = x;
    if (y > 0) {
      if (x >= y) {
        counter.classList.add('valid');
      }
    } else {
      if (x >= z) {
        counter.classList.add('valid');
      }
    }
  }
};

//Added another eventlistener due to DOM Event delegation
checkRows.addEventListener('click', updateCounter);

// Loading previous number of rows, based the DB counter
window.addEventListener('load', function () {
  db.collection('dailyChecking')
    .doc('rows')
    .get()
    .then(function (doc) {
      if (doc.exists) {
        let data = doc.data().rowcount;
        for (let index = 0; index < data; index++) {
          const rowItem = document.createElement('form');
          rowItem.classList.add('flex', 'jc-c', 'table-row');
          rowItem.innerHTML = `<div style="margin: 0 3px;">
          <input type="text" id="table-list" />
        </div>
        <div style="margin: 0 3px;">
          <input name="platform" type="text" list="platforms" />
          <datalist id="platforms">
            <option value="iOS MHTML5"></option>
            <option value="Android MHTML5"></option>
            <option value="Windows Chrome"></option>
            <option value="MacOS Safari"></option>
            <option value="iOS Native"></option>
            <option value="Android Native"></option>
          </datalist>
        </div>
        <div style="margin: 0 3px;">
          <input type="text" name="" id="casino" />
        </div>
        <span class="counter">0</span>
        <input type="number" class="target" placeholder="10" maxlength="2" min="1" max="12" />
        <button class="submitButton" type="button">
          Submit
        </button>`;
          rowManip.before(rowItem);
        }
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    })
    .catch(function (error) {
      console.log('Error getting document:', error);
    });
});
