'use strict';

const trackingFrom = document.querySelector('#tracking-from'),
	trackingTo = document.querySelector('#tracking-to'),
	trackingName = document.querySelector('#tracking-name'),
	trackingPlatform = document.querySelector('#tracking-platform'),
	trackingCasino = document.querySelector('#tracking-casino'),
	trackingSearchBtn = document.querySelector('#tracking-button'),
	tableBody = document.querySelector('tbody'),
	db = firebase.firestore();

let dbTracking;

window.addEventListener('load', function () {
	db.collection('dailyChecking')
		.doc('database')
		.get()
		.then(function (doc) {
			dbTracking = doc.data().tracking;
			console.log();
		})
		.catch(function (error) {
			console.log('Error getting document:', error);
		});
});

trackingSearchBtn.onclick = function () {
	tableBody.innerHTML = '';

	dbTracking.forEach(object => {
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
		let fromSeconds = Date.parse(trackingFrom.value) / 1000;
		let toSeconds = Date.parse(trackingTo.value) / 1000;

		if (fromSeconds <= objectSeconds && objectSeconds <= toSeconds) {
			const rowElement = document.createElement('tr');
			rowElement.classList.add('flex');
			rowElement.innerHTML = `<td>${object.name}</td>
								<td>${object.platform}</td>
								<td>${object.casino}</td>
								<td>PLACEHOLDER</td>
                                <td>${timeToString}</td>`;
			tableBody.append(rowElement);
		}
	});
};
