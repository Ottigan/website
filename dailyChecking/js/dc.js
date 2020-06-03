`use strict`;

const checkRows = document.querySelector('#checkrows'),
	rowManip = document.querySelector('#row-manipulator'),
	db = firebase.firestore();

const manipRows = event => {
	let target = event.target;
	let row = target.parentElement.previousElementSibling;
	if (target.innerHTML === 'Remove' && row.classList.contains('table-row')) {
		db.collection('dailyChecking')
			.doc('rows')
			.get()
			.then(function (doc) {
				let data = doc.data().rowcount;
				let objectArray = doc.data().rowObjects;
				let deleteObject = objectArray.find(value => value.id === data);
				if (data > 0) {
					db.collection('dailyChecking')
						.doc('rows')
						.update({
							rowcount: firebase.firestore.FieldValue.increment(-1),
							rowObjects: firebase.firestore.FieldValue.arrayRemove(
								deleteObject
							),
						})
						.then(function () {
							row.remove();
						})
						.catch(function (error) {});
				}
			})
			.catch(function (error) {
				console.log('Error getting document:', error);
			});
	} else if (target.innerHTML === 'Add') {
		db.collection('dailyChecking')
			.doc('rows')
			.update({
				rowcount: firebase.firestore.FieldValue.increment(1),
			})
			.then(function () {
				db.collection('dailyChecking')
					.doc('rows')
					.get()
					.then(function (doc) {
						let data = doc.data().rowcount;
						const rowItem = document.createElement('form');
						rowItem.classList.add('flex', 'jc-c', 'table-row');
						rowItem.innerHTML = `<div style="margin: 0 3px;">
          <input type="text" name="table" pattern="[a-zA-Z0-9]+" id="table-${data}" required />
        </div>
        <div style="margin: 0 3px;">
          <input id="platform-${data}" name="platform" type="text" list="platforms" required />
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
          <input type="text" name="casino" id="casino-${data}" required />
        </div>
        <span class="counter">0</span>
        <input type="number" class="target" placeholder="10" maxlength="2" min="1" max="12" />
        <button id="${data}" class="submitButton" type="button">
          Submit
        </button>`;
						rowManip.before(rowItem);
						db.collection('dailyChecking')
							.doc('rows')
							.update({
								rowObjects: firebase.firestore.FieldValue.arrayUnion({
									id: data,
									name: '',
									platform: '',
									casino: '',
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

const updateCounter = event => {
	let target = event.target;

	//following IF statement meant to limit event interaction
	if (target.classList.contains('submitButton')) {
		let tableName = document.querySelector(`#table-${target.id}`).value;
		(platform = document.querySelector(`#platform-${target.id}`).value),
			(casino = document.querySelector(`#casino-${target.id}`).value);

		console.log(tableName);
		db.collection('dailyChecking')
			.doc('rows')
			.get()
			.then(function (doc) {
				let rowObjects = doc.data().rowObjects;
				let update = rowObjects[target.id];
				update.casino = casino;
				update.name = tableName;
				update.platform = platform;
				rowObjects[target.id] = update;
				db.collection('dailyChecking')
					.doc('rows')
					.update({
						rowObjects: rowObjects,
					})
					.then(function () {
						console.log('Success!');
					})
					.catch(function (error) {
						console.log(error);
					});
			})
			.catch(error => {
				console.log(error);
			});

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

// Loading previous number of rows, based on the DB counter with the previous DATA
window.addEventListener('load', function () {
	db.collection('dailyChecking')
		.doc('rows')
		.get()
		.then(function (doc) {
			if (doc.exists) {
				let rows = doc.data().rowcount;
				let rowObjects = doc.data().rowObjects;
				let i = 0;
				do {
					if (i === 0) {
						document.querySelector(`#table-${i}`).value = rowObjects[i].name;
						document.querySelector(`#platform-${i}`).value =
							rowObjects[i].platform;
						document.querySelector(`#casino-${i}`).value = rowObjects[i].casino;
					} else if (i > 0) {
						const rowItem = document.createElement('form');
						rowItem.classList.add('flex', 'jc-c', 'table-row');
						rowItem.innerHTML = `<div style="margin: 0 3px;">
          <input type="text" name="table" pattern="[a-zA-Z0-9 ]+" id="table-${rowObjects[i].id}" value="${rowObjects[i].name}" required />
        </div>
        <div style="margin: 0 3px;">
              <input id="platform-${rowObjects[i].id}" value="${rowObjects[i].platform}" name="platform" type="text" list="platforms" required />
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
              <input type="text" name="casino" id="casino-${rowObjects[i].id}" value="${rowObjects[i].casino}" required />
            </div>
            <span class="counter">0</span>
            <input type="number" class="target" placeholder="10" maxlength="2" min="1" max="12" />
            <button id="${rowObjects[i].id}" class="submitButton" type="button">
              Submit
        </button>`;
						rowManip.before(rowItem);
					}
					i++;
				} while (i <= rows);
			}
		})
		.catch(function (error) {
			console.log('Error getting document:', error);
		});
});
