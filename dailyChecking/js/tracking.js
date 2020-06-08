'use strict';
// Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCOiJc8EKT9DyXyuAKPeKpJLnvYs_vINFU',
	authDomain: 'starlit-braid-276207.firebaseapp.com',
	databaseURL: 'https://starlit-braid-276207.firebaseio.com',
	projectId: 'starlit-braid-276207',
	storageBucket: 'starlit-braid-276207.appspot.com',
	messagingSenderId: '30277815528',
	appId: '1:30277815528:web:517d7d0743d3d5530a4d5d',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const trackingFrom = document.querySelector('#tracking-from'),
	trackingTo = document.querySelector('#tracking-to'),
	trackingName = document.querySelector('#tracking-name'),
	trackingPlatform = document.querySelector('#tracking-platform'),
	trackingCasino = document.querySelector('#tracking-casino'),
	trackingSearchBtn = document.querySelector('#tracking-button'),
	dbForm = document.querySelector('#db-form'),
	gameTableNames = document.getElementById('names'),
	casinoNames = document.getElementById('casinos'),
	tableBody = document.querySelector('tbody'),
	db = firebase.firestore();

let dbTracking;
let tablesDB;
let casinosDB;

firebase.auth().onAuthStateChanged(dailyCheckingUser => {
	if (dailyCheckingUser) {
	} else {
		console.log('not logged in')
	}
})

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

window.addEventListener('load', function () {
	db.collection('dailyChecking')
		.doc('tables')
		.get()
		.then(function (doc) {
			tablesDB = doc.data().names;
		})
		.catch(function (error) {});

	db.collection('dailyChecking')
		.doc('casinos')
		.get()
		.then(function (doc) {
			casinosDB = doc.data().names;
		})
		.catch(function (error) {});

	db.collection('dailyChecking')
		.doc('database')
		.get()
		.then(function (doc) {
			dbTracking = doc.data().tracking;
		})
		.catch(function (error) {
			console.log('Error getting document:', error);
		});
});

trackingSearchBtn.onclick = function () {
	tableBody.innerHTML = '';

	dbTracking.forEach(object => {
		let qa;
		switch (object.qa) {
			case 'eckYksePcfdox9I4FLVwTe72bSk1':
				qa = 'Jānis Malcāns';
				break;
			case '1BRPSY3Q0yOeI7ReCCrRuVx0Fdo2':
				qa = 'Aleksandra Pancernaja';
				break;
			case '2Rvrq1fn5sdCWnpxZbT3lZrUbDm1':
				qa = 'Anastasija Dmitrijeva';
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
		rowElement.innerHTML = `<td>${ object.name }</td>
								<td>${object.platform }</td>
								<td>${object.casino }</td>
								<td>${qa }</td>
                                <td>${timeToString }</td>`;

		if (
			fromSeconds <= objectSeconds &&
			objectSeconds <= toSeconds &&
			trackingName.value === object.name &&
			trackingPlatform.value === object.platform &&
			trackingCasino.value === object.casino
		) {
			tableBody.append(rowElement);
		} else if (
			fromSeconds <= objectSeconds &&
			objectSeconds <= toSeconds &&
			trackingName.value === object.name &&
			trackingPlatform.value === object.platform
		) {
			tableBody.append(rowElement);
		} else if (
			fromSeconds <= objectSeconds &&
			objectSeconds <= toSeconds &&
			trackingCasino.value === object.casino &&
			trackingPlatform.value === object.platform
		) {
			tableBody.append(rowElement);
		} else if (
			fromSeconds <= objectSeconds &&
			objectSeconds <= toSeconds &&
			trackingName.value === object.name &&
			trackingCasino.value === object.casino
		) {
			tableBody.append(rowElement);
		} else if (
			fromSeconds <= objectSeconds &&
			objectSeconds <= toSeconds &&
			trackingName.value === object.name
		) {
			tableBody.append(rowElement);
		} else if (
			fromSeconds <= objectSeconds &&
			objectSeconds <= toSeconds &&
			trackingCasino.value === object.casino
		) {
			tableBody.append(rowElement);
		} else if (
			fromSeconds <= objectSeconds &&
			objectSeconds <= toSeconds &&
			trackingPlatform.value === object.platform
		) {
			tableBody.append(rowElement);
		} else if (
			fromSeconds <= objectSeconds &&
			objectSeconds <= toSeconds &&
			!trackingName.value &&
			!trackingPlatform.value &&
			!trackingCasino.value
		) {
			tableBody.append(rowElement);
		}
	});
};
