'use strict';

const newTable = document.querySelector('#new-table'),
	newCasino = document.querySelector('#new-casino'),
	addTableBtn = document.querySelector('#add-table'),
	addCasinoBtn = document.querySelector('#add-casino'),
	tableList = document.querySelector('#table-list'),
	casinoList = document.querySelector('#casino-list'),
	db = firebase.firestore();

addTableBtn.onclick = function () {
	let newTableValue = newTable.value;
	let empty = newTableValue.trim();

	if (!empty) {
		alert('Empty Value!');
		newTable.classList.add('invalid');
		newTable.focus();
	} else {
		newTable.value = '';
		newTable.classList.remove('invalid');
		addTableListItem(newTableValue);
		db.collection('dailyChecking')
			.doc('tables')
			.update({
				names: firebase.firestore.FieldValue.arrayUnion(newTableValue),
			})
			.then(function () {
				console.log('New Table added');
			})
			.catch(function (error) {
				console.error('Error adding document: ', error);
			});
	}
};

const addTableListItem = item => {
	const listItem = document.createElement('li');
	// listItem.innerText = item;
	listItem.style.paddingLeft = '2px';
	listItem.classList.add('l-decoration', 'flex', 'jc-sb', 'ai-c', 'list-item');
	listItem.innerHTML = `${item}<button type="button" style="width: 10%" class="remove">x</button>`;
	tableList.prepend(listItem);
};

addCasinoBtn.onclick = function () {
	let newCasinoValue = newCasino.value;
	let empty = newCasinoValue.trim();

	if (!empty) {
		alert('Empty Value!');
		newCasino.classList.add('invalid');
		newCasino.focus();
	} else {
		newCasino.value = '';
		newCasino.classList.remove('invalid');
		addCasinoListItem(newCasinoValue);
		db.collection('dailyChecking')
			.doc('casinos')
			.update({
				names: firebase.firestore.FieldValue.arrayUnion(newCasinoValue),
			})
			.then(function () {
				console.log('New Casino added');
			})
			.catch(function (error) {
				console.error('Error adding document: ', error);
			});
	}
};

const addCasinoListItem = item => {
	const listItem = document.createElement('li');
	listItem.classList.add('l-decoration', 'flex', 'jc-sb', 'ai-c', 'list-item');
	listItem.innerHTML = `${item}<button type="button" style="width: 10%" class="remove">x</button>`;
	casinoList.prepend(listItem);
};

const removeTableOperation = event => {
	let target = event.target;
	let listInner = target.closest('.list-item').innerHTML;
	let listValue = listInner.substring(0, listInner.indexOf('<', 0));
	if (target.classList.contains('remove')) {
		db.collection('dailyChecking')
			.doc('tables')
			.update({
				names: firebase.firestore.FieldValue.arrayRemove(listValue),
			})
			.then(function () {
				target.closest('.list-item').remove();
			})
			.catch(function (error) {
				console.error('Error adding document: ', error);
			});
	}
};

const removeCasinoOperation = event => {
	let target = event.target;
	let listInner = target.closest('.list-item').innerHTML;
	let listValue = listInner.substring(0, listInner.indexOf('<', 0));
	if (target.classList.contains('remove')) {
		db.collection('dailyChecking')
			.doc('casinos')
			.update({
				names: firebase.firestore.FieldValue.arrayRemove(listValue),
			})
			.then(function () {
				target.closest('.list-item').remove();
			})
			.catch(function (error) {
				console.error('Error adding document: ', error);
			});
	}
};

tableList.addEventListener('click', removeTableOperation);

casinoList.addEventListener('click', removeCasinoOperation);

newTable.addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
		event.preventDefault();
		let newTableValue = newTable.value;
		let empty = newTableValue.trim();

		if (!empty) {
			alert('Empty Value!');
			newTable.classList.add('invalid');
			newTable.focus();
		} else {
			newTable.value = '';
			newTable.classList.remove('invalid');
			addTableListItem(newTableValue);
			db.collection('dailyChecking')
				.doc('tables')
				.update({
					names: firebase.firestore.FieldValue.arrayUnion(newTableValue),
				})
				.then(function () {
					console.log('New Table added');
				})
				.catch(function (error) {
					console.error('Error adding document: ', error);
				});
		}
	}
});

newCasino.addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
		event.preventDefault();
		let newCasinoValue = newCasino.value;
		let empty = newCasinoValue.trim();

		if (!empty) {
			alert('Empty Value!');
			newCasino.classList.add('invalid');
			newCasino.focus();
		} else {
			newCasino.value = '';
			newCasino.classList.remove('invalid');
			addCasinoListItem(newCasinoValue);
			db.collection('dailyChecking')
				.doc('casinos')
				.update({
					names: firebase.firestore.FieldValue.arrayUnion(newCasinoValue),
				})
				.then(function () {
					console.log('New Casino added');
				})
				.catch(function (error) {
					console.error('Error adding document: ', error);
				});
		}
	}
});

window.addEventListener('load', function () {
	db.collection('dailyChecking')
		.doc('tables')
		.get()
		.then(function (doc) {
			if (doc.exists) {
				let data = doc.data();
				data.names.forEach(value => addTableListItem(value));
			} else {
				// doc.data() will be undefined in this case
				console.log('No such document!');
			}
		})
		.catch(function (error) {
			console.log('Error getting document:', error);
		});
	db.collection('dailyChecking')
		.doc('casinos')
		.get()
		.then(function (doc) {
			if (doc.exists) {
				let data = doc.data();
				data.names.forEach(value => addCasinoListItem(value));
			} else {
				console.log('No such document!');
			}
		})
		.catch(function (error) {
			console.log('Error getting document:', error);
		});
});
