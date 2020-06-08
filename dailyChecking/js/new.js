'use strict';
// Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCOiJc8EKT9DyXyuAKPeKpJLnvYs_vINFU',
	authDomain: 'starlit-braid-276207.firebaseapp.com',
	databaseURL: 'https://starlit-braid-276207.firebaseio.com',
	projectId: 'starlit-braid-276207',
	storageBucket: 'starlit-braid-276207.appspot.com',
	messagingSenderId: '30277815528',
	appId: '1:30277815528:web:517d7d0743d3d5530a4d5d'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const loginForm = document.getElementById("login-form"),
	loginButton = document.getElementById('login-button'),
	logoutButton = document.getElementById('logout-button'),
	txtUser = document.getElementById('txt-user'),
	txtPass = document.getElementById('txt-pass'),
	newTable = document.querySelector('#new-table'),
	newCasino = document.querySelector('#new-casino'),
	addTableBtn = document.querySelector('#add-table'),
	addCasinoBtn = document.querySelector('#add-casino'),
	tableList = document.querySelector('#table-list'),
	casinoList = document.querySelector('#casino-list'),
	auth = firebase.auth(),
	db = firebase.firestore();

let userUID;

//Add login event 
loginButton.addEventListener('click', function () {
	const user = txtUser.value;
	const pass = txtPass.value;
	const authPromise = auth.signInWithEmailAndPassword(user, pass);

	authPromise
		.catch(error => console.log(error.message))
})

firebase.auth().onAuthStateChanged(dailyCheckingUser => {
	if (dailyCheckingUser) {
		userUID = dailyCheckingUser.uid;
		let greeting = document.createElement('h6')
		let qa;
		switch (userUID) {
			case 'eckYksePcfdox9I4FLVwTe72bSk1':
				qa = 'Ottigan';
				break;
			case '1BRPSY3Q0yOeI7ReCCrRuVx0Fdo2':
				qa = 'Unicorn';
				break;
			case '2Rvrq1fn5sdCWnpxZbT3lZrUbDm1':
				qa = 'Martiwka';
				break;
			case 'w967NxXDmwUxMMhhKyQizzF5B8S2':
				qa = 'Boss';
				break;
			default:
				qa = '';
		}
		greeting.innerText = `Welcome, ${ qa }!`;
		greeting.style.cssText = 'position: fixed; display: inline; color: white; visibility: visible; right: 155px; top: 37px; font-family: Georgia, "Times New Roman", Times, serif; font-weight: 400';
		logoutButton.before(greeting);

		logoutButton.style.visibility = 'visible';
		txtUser.style.visibility = 'hidden';
		txtPass.style.visibility = 'hidden';
		loginButton.style.visibility = 'hidden';

		const getData = function () {
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
		};
		getData();
	} else {
		logoutButton.style.visibility = 'hidden';
		txtUser.style.visibility = 'visible';
		txtPass.style.visibility = 'visible';
		loginButton.style.visibility = 'visible';
	}
})

logoutButton.addEventListener('click', function () {
	auth.signOut()
		.then(function () {
			document.querySelector('h6').remove();
			logoutButton.classList = 'hide-logout'
		})
})

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
	listItem.innerHTML = `${ item }<button type="button" style="width: 10%" class="remove">x</button>`;
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
	listItem.innerHTML = `${ item }<button type="button" style="width: 10%" class="remove">x</button>`;
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
