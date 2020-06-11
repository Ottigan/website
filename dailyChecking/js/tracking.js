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
	trackingFrom = document.querySelector('#tracking-from'),
	trackingTo = document.querySelector('#tracking-to'),
	trackingName = document.querySelector('#tracking-name'),
	trackingPlatform = document.querySelector('#tracking-platform'),
	trackingCasino = document.querySelector('#tracking-casino'),
	trackingSearchBtn = document.querySelector('#tracking-button'),
	dbForm = document.querySelector('#db-form'),
	gameTableNames = document.getElementById('names'),
	casinoNames = document.getElementById('casinos'),
	dbData = document.getElementById('db-data'),
	entireTable = document.querySelector('table'),
	tableBody = document.querySelector('tbody'),
	auth = firebase.auth(),
	db = firebase.firestore();

let userUID;
let dbTracking;
let tablesDB;
let casinosDB;
let csvArray = '';
let csvButton;

//Add login event 
loginButton.addEventListener('click', function () {
	const user = txtUser.value;
	const pass = txtPass.value;
	const authPromise = auth.signInWithEmailAndPassword(user, pass);

	authPromise
		.catch(error => console.log(error.message));
});

firebase.auth().onAuthStateChanged(dailyCheckingUser => {
	if (dailyCheckingUser) {
		userUID = dailyCheckingUser.uid;
		let greeting = document.createElement('h6');
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
		greeting.innerText = `Welcome, ${qa}!`;
		greeting.style.cssText = 'margin-bottom: -2px; align-self: flex-end; color: white; visibility: visible; font-family: Georgia, "Times New Roman", Times, serif; font-weight: 400';
		logoutButton.before(greeting);


		logoutButton.style.display = 'inline';
		txtUser.style.display = 'none';
		txtPass.style.display = 'none';
		loginButton.style.display = 'none';


		const getData = function () {
			db.collection('dailyChecking')
				.doc('tables')
				.get()
				.then(function (doc) {
					tablesDB = doc.data().names;
				})
				.catch(function (error) { });

			db.collection('dailyChecking')
				.doc('casinos')
				.get()
				.then(function (doc) {
					casinosDB = doc.data().names;
				})
				.catch(function (error) { });

			db.collection('dailyChecking')
				.doc('database')
				.get()
				.then(function (doc) {
					dbTracking = doc.data().tracking;
				})
				.catch(function (error) {
					console.log('Error getting document:', error);
				});
		};
		getData();
	} else {
		logoutButton.style.display = 'none';
		txtUser.style.display = 'inline';
		txtPass.style.display = 'inline';
		loginButton.style.display = 'inline';
	}
});

logoutButton.addEventListener('click', function () {
	auth.signOut()
		.then(function () {
			document.querySelector('h6').remove();
			logoutButton.classList = 'hide-logout';
		});
});

const updateOptions = event => {
	let target = event.target;
	//Logic to ignore mouse clicks due to them being undefined
	let eventKey = event.key ? event.key : 0;

	if (eventKey !== 'Shift') {
		gameTableNames.innerHTML = '';
		casinoNames.innerHTML = '';
	}

	if (
		(target.classList.contains('inputElement') &&
			event.type === 'keyup' &&
			eventKey.length === 1) ||
		eventKey === 'Backspace'
	) {
		gameTableNames.innerHTML = '';
		tablesDB.forEach(value => {
			if (
				gameTableNames.childElementCount <= 10 &&
				value.toLowerCase().includes(target.value.toLowerCase())
			) {
				let namesOptionItem = document.createElement('option');
				namesOptionItem.value = value;

				gameTableNames.append(namesOptionItem);
			}
		});
		casinoNames.innerHTML = '';
		casinosDB.forEach(value => {
			if (
				casinoNames.childElementCount <= 10 &&
				value.toLowerCase().includes(target.value.toLowerCase())
			) {
				let casinosOptionItem = document.createElement('option');
				casinosOptionItem.value = value;

				casinoNames.append(casinosOptionItem);
			}
		});
	}
};

dbForm.addEventListener('click', updateOptions);
dbForm.addEventListener('keyup', updateOptions);



trackingSearchBtn.onclick = function () {
	tableBody.innerHTML = '';
	csvArray = '';
	if (csvButton) {
		csvButton.remove();
	}


	dbTracking.forEach(object => {
		let qa;
		switch (object.qa) {
			case 'eckYksePcfdox9I4FLVwTe72bSk1':
				qa = 'Janis Malcans';
				break;
			case '1BRPSY3Q0yOeI7ReCCrRuVx0Fdo2':
				qa = 'Aleksandra Pancernaja';
				break;
			case '2Rvrq1fn5sdCWnpxZbT3lZrUbDm1':
				qa = 'Anastasija Dmitrijeva';
				break;
			case 'w967NxXDmwUxMMhhKyQizzF5B8S2':
				qa = 'Diana Anca';
				break;
			default:
				qa = '';
		}

		// using toISOString because the format is the easiest to adapt for Excel
		let timeISO = new Date((object.when.seconds + 10800) * 1000).toISOString();
		let date = timeISO.substring(0, timeISO.indexOf('T'));
		let time = timeISO.substring(
			timeISO.indexOf('T') + 1,
			timeISO.indexOf('.')
		);
		let timeToString = date + ' ' + time;

		// added 10800 seconds to adjust for GMT+3
		let objectSeconds = object.when.seconds + 10800;
		let fromSeconds =
			Date.parse(trackingFrom.value) / 1000 ||
			new Date().setDate(new Date().getDate() - 1) / 1000;
		let toSeconds =
			Date.parse(trackingTo.value) / 1000 ||
			new Date().setDate(new Date().getDate() + 1) / 1000;

		const rowElement = document.createElement('tr');
		rowElement.classList.add('flex');
		rowElement.innerHTML = `<td>${object.name}</td>
								<td>${object.platform}</td>
								<td>${object.casino}</td>
								<td>${qa}</td>
                                <td>${timeToString}</td>`;

		if (
			fromSeconds <= objectSeconds &&
			objectSeconds <= toSeconds &&
			trackingName.value === object.name &&
			trackingPlatform.value === object.platform &&
			trackingCasino.value === object.casino
		) {
			tableBody.append(rowElement);
			csvArray += `\n${object.name};${object.platform};${object.casino};${qa};${timeToString}`;
		} else if (
			fromSeconds <= objectSeconds &&
			objectSeconds <= toSeconds &&
			trackingName.value === object.name &&
			trackingPlatform.value === object.platform
		) {
			tableBody.append(rowElement);
			csvArray += `\n${object.name};${object.platform};${object.casino};${qa};${timeToString}`;
		} else if (
			fromSeconds <= objectSeconds &&
			objectSeconds <= toSeconds &&
			trackingCasino.value === object.casino &&
			trackingPlatform.value === object.platform
		) {
			tableBody.append(rowElement);
			csvArray += `\n${object.name};${object.platform};${object.casino};${qa};${timeToString}`;
		} else if (
			fromSeconds <= objectSeconds &&
			objectSeconds <= toSeconds &&
			trackingName.value === object.name &&
			trackingCasino.value === object.casino
		) {
			tableBody.append(rowElement);
			csvArray += `\n${object.name};${object.platform};${object.casino};${qa};${timeToString}`;
		} else if (
			fromSeconds <= objectSeconds &&
			objectSeconds <= toSeconds &&
			trackingName.value === object.name
		) {
			tableBody.append(rowElement);
			csvArray += `\n${object.name};${object.platform};${object.casino};${qa};${timeToString}`;
		} else if (
			fromSeconds <= objectSeconds &&
			objectSeconds <= toSeconds &&
			trackingCasino.value === object.casino
		) {
			tableBody.append(rowElement);
			csvArray += `\n${object.name};${object.platform};${object.casino};${qa};${timeToString}`;
		} else if (
			fromSeconds <= objectSeconds &&
			objectSeconds <= toSeconds &&
			trackingPlatform.value === object.platform
		) {
			tableBody.append(rowElement);
			csvArray += `\n${object.name};${object.platform};${object.casino};${qa};${timeToString}`;
		} else if (
			fromSeconds <= objectSeconds &&
			objectSeconds <= toSeconds &&
			!trackingName.value &&
			!trackingPlatform.value &&
			!trackingCasino.value
		) {
			tableBody.append(rowElement);
			csvArray += `\n${object.name};${object.platform};${object.casino};${qa};${timeToString}`;
		}
	});

	if (tableBody.childElementCount > 1) {
		let csv = document.createElement('button');
		csv.style.cssText = 'width: 50px; margin-top: 15px';
		csv.innerHTML = 'CSV';
		csv.id = 'csv-button';
		csv.type = 'button';

		entireTable.append(csv);
		csvButton = document.getElementById('csv-button');
	}
};

dbData.addEventListener('click', function (event) {
	console.log(csvArray);
	if (event.target.id === 'csv-button') {
		let hiddenCSV = document.createElement('a');
		hiddenCSV.href = 'data:text/csv;charset=utf-8,' + encodeURI('Game Table;Platform;Casino;QA;Timestamp' + csvArray);
		hiddenCSV.target = '_blank';
		hiddenCSV.download = 'daily checking data.csv';
		hiddenCSV.click();
	}
});