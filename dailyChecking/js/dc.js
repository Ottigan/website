`use strict`;

// Your web app's Firebase configuration
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

const loginForm = document.getElementById('login-form'),
	loginButton = document.getElementById('login-button'),
	logoutButton = document.getElementById('logout-button'),
	txtUser = document.getElementById('txt-user'),
	txtPass = document.getElementById('txt-pass'),
	popOutBtn = document.getElementById('pop-out'),
	styleSheet = document.getElementById('style'),
	themeToggle = document.querySelector('.theme-label'),
	themeSwitch = document.querySelector('#switch'),
	theBall = document.querySelector('.ball'),
	checkRows = document.querySelector('#checkrows'),
	menuToggleBtn = document.querySelector('#menu-toggle'),
	hiddenMenu = document.querySelector('#hidden-menu'),
	overlay = document.querySelector('#overlay'),
	rowManip = document.querySelector('#row-manipulator'),
	gameTableNames = document.getElementById('names'),
	casinoNames = document.getElementById('casinos'),
	auth = firebase.auth(),
	db = firebase.firestore();

let userUID;
let tableRows;
let allCounters = document.querySelectorAll('.counter');
let allTargets;
let tablesDB;
let casinosDB;
let inputElements = document.querySelectorAll('.inputElement');

//Add login event
loginButton.addEventListener('click', function () {
	const email = txtUser.value;
	const pass = txtPass.value;
	const authPromise = auth.signInWithEmailAndPassword(email, pass);

	authPromise
		.then(function () {
			console.log('Login successful!');
			txtUser.classList.remove('empty-value');
			txtPass.classList.remove('empty-value');
		})
		.catch(error => {
			console.error(error.message);
			if (
				error.message ===
				'There is no user record corresponding to this identifier. The user may have been deleted.'
			) {
				txtUser.classList.add('empty-value');
				txtUser.focus();
			} else if (
				error.message ===
				'The password is invalid or the user does not have a password.'
			) {
				txtPass.classList.add('empty-value');
				txtPass.focus();
			}
		});
});

firebase.auth().onAuthStateChanged(dailyCheckingUser => {
	if (dailyCheckingUser) {
		//current user valid option: firebase.auth().currentUser.uid
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
			case '6pLL44pT1SaihfvEtT99tNuKDB42':
				qa = 'Sauļuk';
				break;
			case 'a6CtpqvK26SqM1sulP86gCL5jYB2':
				qa = 'Sette e Mezzo';
				break;
			case 'Y9MfBHGQ0YdC8k2XHBbQtgRQ6m72':
				qa = '4chan.org/g/audio_god';
				break;
			default:
				qa = '';
		}
		greeting.innerText = `Welcome, ${qa}!`;
		greeting.style.cssText =
			'margin-bottom: -2px; align-self: flex-end; color: white; visibility: visible; font-family: Georgia, "Times New Roman", Times, serif; font-weight: 400';
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
				.catch(function (error) {});

			db.collection('dailyChecking')
				.doc('casinos')
				.get()
				.then(function (doc) {
					casinosDB = doc.data().names;
				})
				.catch(function (error) {});

			db.collection('dailyChecking')
				.doc(userUID)
				.get()
				.then(function (doc) {
					if (doc.exists) {
						let rows = doc.data().rowcount;
						let rowObjects = doc.data().rowObjects;
						let i = 0;
						do {
							if (i === 0) {
								document.querySelector(`#table-${i}`).value =
									rowObjects[i].name;
								document.querySelector(`#platform-${i}`).value =
									rowObjects[i].platform;
								document.querySelector(`#casino-${i}`).value =
									rowObjects[i].casino;
							} else if (i > 0) {
								const rowItem = document.createElement('form');
								rowItem.classList.add('flex', 'jc-c', 'table-row');
								rowItem.innerHTML = `<div>
									<input type="text" name="table" pattern="[a-zA-Z0-9 ]+" list="names" class="inputElement highlight-this table-name" autocomplete="off" id="table-${
										rowObjects[i].id
									}" value="${rowObjects[i].name}"/>
									</div>
									<div>
									<input id="platform-${
										rowObjects[i].id
									}" class="highlight-this platform-name" value="${
									rowObjects[i].platform
								}" name="platform" type="text" list="platforms" autocomplete="off"/>
									</div>
									<div>
									<input type="text" name="casino" list="casinos" class="inputElement highlight-this casino-name" autocomplete="off" id="casino-${
										rowObjects[i].id
									}" value="${rowObjects[i].casino.toLowerCase()}"/>
									</div>
									<span id="counter-${rowObjects[i].id}" class="counter highlight-this">${
									rowObjects[i].counter || 0
								}</span>
									<input id="target-${
										rowObjects[i].id
									}" type="number" class="target highlight-this" value="${
									rowObjects[i].target || 1
								}" maxlength="2" min="1" max="12" />
									<button id="${
										rowObjects[i].id
									}" class="submitButton highlight-this" type="button">
									Submit
									</button>`;
								rowManip.before(rowItem);
							}
							i++;
						} while (i <= rows);
						inputElements = document.querySelectorAll('input');
						tableRows = document.querySelectorAll('.table-row');

						let counter = document.querySelectorAll(`.counter`),
							goal = document.querySelectorAll(`.target`);

						for (let i = 0; i < counter.length; i++) {
							let x = Number.parseInt(counter[i].innerHTML),
								y = goal[i].value;

							if (x >= y) {
								counter[i].classList.add('valid');
								counter[i].classList.remove('invalid');
							} else {
								counter[i].classList.add('invalid');
								counter[i].classList.remove('valid');
							}
						}
					}
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
	auth.signOut().then(function () {
		document.querySelector('h6').remove();
		logoutButton.classList = 'hide-logout';
		document.getElementById('table-0').value = '';
		document.getElementById('platform-0').value = '';
		document.getElementById('casino-0').value = '';
		document.querySelectorAll('.table-row').forEach(row => row.remove());
	});
});

//Row addition and removal
//Chaining promise requests from firestore to sync DB info with client info
//During the promise chaining buttons are disabled, to avoid information desync
const manipRows = event => {
	let target = event.target;
	let row = target.parentElement.previousElementSibling;
	if (target.innerHTML === 'Remove' && row.classList.contains('table-row')) {
		target.setAttribute('disabled', 'disabled');
		db.collection('dailyChecking')
			.doc(userUID)
			.get()
			.then(function (doc) {
				let data = doc.data().rowcount;
				let objectArray = doc.data().rowObjects;
				let deleteObject = objectArray.find(value => value.id === data);
				if (data > 0) {
					db.collection('dailyChecking')
						.doc(userUID)
						.update({
							rowcount: firebase.firestore.FieldValue.increment(-1),
							rowObjects: firebase.firestore.FieldValue.arrayRemove(
								deleteObject
							),
						})
						.then(function () {
							row.remove();
							tableRows = document.querySelectorAll('.table-row');
							target.removeAttribute('disabled');
						})
						.catch(function (error) {
							console.error('Could not update user profile:', error);
							target.removeAttribute('disabled');
						});
				}
			})
			.catch(function (error) {
				console.log('Failed retrieving rowcount:', error);
				target.removeAttribute('disabled');
			});
	} else if (target.innerHTML === 'Add') {
		target.setAttribute('disabled', 'disabled');
		db.collection('dailyChecking')
			.doc(userUID)
			.update({
				rowcount: firebase.firestore.FieldValue.increment(1),
			})
			.then(function () {
				db.collection('dailyChecking')
					.doc(userUID)
					.get()
					.then(function (doc) {
						let id = doc.data().rowcount;
						const rowItem = document.createElement('form');
						rowItem.classList.add('flex', 'jc-c', 'table-row');
						rowItem.innerHTML = `<div>
							<input type="text" name="table" list="names" class="inputElement" autocomplete="off" pattern="[a-zA-Z0-9]+" id="table-${id}" />
							</div>
							<div>
							<input id="platform-${id}" name="platform" type="text" list="platforms" autocomplete="off"/>
							</div>
							<div>
							<input type="text" name="casino" id="casino-${id}" list="casinos" class="inputElement" autocomplete="off"/>
							</div>
							<span id="counter-${id}" class="counter highlight-this invalid">0</span>
							<input id="target-${id}" type="number" class="target highlight-this" value="1" maxlength="2" min="0" max="12" />
							<button id="${id}" class="submitButton" type="button">
							Submit
							</button>`;
						rowManip.before(rowItem);
						db.collection('dailyChecking')
							.doc(userUID)
							.update({
								rowObjects: firebase.firestore.FieldValue.arrayUnion({
									id: id,
									name: '',
									platform: '',
									casino: '',
									counter: 0,
									target: 1,
								}),
							})
							.then(function () {
								console.log('Row successfully added!');
								tableRows = document.querySelectorAll('.table-row');
								target.removeAttribute('disabled');
							})
							.catch(function (error) {
								console.error('Error adding Object row: ', error);
								target.removeAttribute('disabled');
							});
					})
					.catch(function (error) {
						console.error('Failed retrieving rowcount:', error);
						target.removeAttribute('disabled');
					});
			})
			.catch(function (error) {
				console.error('Error incrementing rowcount: ', error);
				target.removeAttribute('disabled');
			});
	}
};

checkRows.addEventListener('click', manipRows);

const updateCounterAndOptions = event => {
	let target = event.target;
	//Logic to ignore mouse clicks due to them being undefined
	let eventKey = event.key ? event.key : 0;

	if (
		eventKey !== 'Shift' &&
		event.type !== 'mouseover' &&
		event.type !== 'mouseout'
	) {
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

	if (target.classList.contains('highlight-this')) {
		let indexID = target.id.substring(target.id.indexOf('-') + 1),
			tableName = document.querySelector(`#table-${indexID}`),
			platform = document.querySelector(`#platform-${indexID}`),
			casino = document.querySelector(`#casino-${indexID}`),
			counter = document.querySelector(`#counter-${indexID}`) || menuToggleBtn,
			targetNumber =
				document.querySelector(`#target-${indexID}`) || menuToggleBtn,
			submitButton = document.getElementById(`${indexID}`);

		if (event.type === 'mouseover') {
			tableName.classList.add('highlighted-row');
			platform.classList.add('highlighted-row');
			casino.classList.add('highlighted-row');
			counter.classList.add('highlighted-row');
			targetNumber.classList.add('highlighted-row');
			submitButton.classList.add('highlighted-row');
		} else if (event.type === 'mouseout') {
			tableName.classList.remove('highlighted-row');
			platform.classList.remove('highlighted-row');
			casino.classList.remove('highlighted-row');
			counter.classList.remove('highlighted-row');
			targetNumber.classList.remove('highlighted-row');
			submitButton.classList.remove('highlighted-row');
		}
	}

	if (target.classList.contains('submitButton') && event.type === 'click') {
		let tableName = document.querySelector(`#table-${target.id}`).value,
			platform = document.querySelector(`#platform-${target.id}`).value,
			casino = document.querySelector(`#casino-${target.id}`).value,
			counter = document.querySelector(`#counter-${target.id}`) || 'None',
			goal = document.querySelector(`#target-${target.id}`) || 'None';

		if (counter != 'None' && goal != 'None') {
			let x = counter.innerHTML,
				y = goal.value;
			x++;
			counter.innerHTML = x;

			if (x >= y) {
				counter.classList.add('valid');
				counter.classList.remove('invalid');
			} else {
				counter.classList.add('invalid');
				counter.classList.remove('valid');
			}
		}

		//getting the entire firestore array, because you can't update specific values in the cloud
		db.collection('dailyChecking')
			//changing the following userUID helps copying row state between users
			.doc(userUID)
			.get()
			.then(function (doc) {
				if (tableName != '' && platform != '' && casino != '') {
					let rowObjects = doc.data().rowObjects;
					let rowcount = doc.data().rowcount;
					let update = rowObjects[target.id];
					let clientTime = new Date();
					update.casino = casino;
					update.name = tableName;
					update.platform = platform;
					update.counter = Number.parseInt(counter.innerHTML);
					update.target = Number.parseInt(goal.value);
					rowObjects[target.id] = update;
					db.collection('dailyChecking')
						.doc(userUID)
						.update({
							rowObjects: rowObjects,
							rowcount: rowcount,
							tracking: firebase.firestore.FieldValue.arrayUnion({
								name: tableName,
								platform: platform,
								casino: casino,
								qa: userUID,
								when: clientTime,
							}),
						})
						.then(function () {
							console.log('Tracking DB updated');
							target.blur();
						})
						.catch(function (error) {
							console.error(error);
						});
				} else {
					let rowObjects = doc.data().rowObjects;
					let rowcount = doc.data().rowcount;
					let update = rowObjects[target.id];
					update.casino = casino;
					update.name = tableName;
					update.platform = platform;
					update.counter = Number.parseInt(counter.innerHTML);
					update.target = Number.parseInt(goal.value);
					rowObjects[target.id] = update;
					db.collection('dailyChecking')
						.doc(userUID)
						.update({
							rowObjects: rowObjects,
							rowcount: rowcount,
						})
						.then(function () {
							console.log('Tracking DB updated');
						})
						.catch(function (error) {
							console.error(error);
						});
				}
			})
			.catch(error => {
				console.error(error);
			});
	} else if (target.id === 'save-button' && event.type === 'click') {
		let newTableRowOrder = [];

		//Copying each node of the original array with parameter of TRUE to copy ALL the children
		//This approach is used to deal with the deep reference issue, which can't be bypassed with
		//Spread operator, Object.assign or JSON.parse(JSON.stringify())
		for (let i = 0; i < tableRows.length; i++) {
			newTableRowOrder.push(tableRows[i].cloneNode(true));
		}

		//sorting rows based on target value in a descending order
		newTableRowOrder.sort(
			(a, b) => Number.parseInt(b[3].value) - Number.parseInt(a[3].value)
		);

		//Re-assigning values to DOM elements
		for (let i = 0; i < newTableRowOrder.length; i++) {
			tableRows[i][0].value = newTableRowOrder[i][0].value;
			tableRows[i][1].value = newTableRowOrder[i][1].value;
			tableRows[i][2].value = newTableRowOrder[i][2].value;
			tableRows[i].children[3].innerText =
				newTableRowOrder[i].children[3].innerText;
			tableRows[i][3].value = newTableRowOrder[i][3].value;
		}

		allCounters = document.querySelectorAll('.counter');
		allTargets = document.querySelectorAll('.target');

		for (let i = 0; i < allCounters.length; i++) {
			let counter = allCounters[i];
			let x = Number.parseInt(allCounters[i].innerHTML);
			let y = allTargets[i].value;

			if (x >= y) {
				counter.classList.add('valid');
				counter.classList.remove('invalid');
			} else {
				counter.classList.add('invalid');
				counter.classList.remove('valid');
			}
		}

		// getting the entire firestore array, because you can't update specific values in the cloud
		db.collection('dailyChecking')
			//changing the following userUID helps copying row state between users
			.doc(userUID)
			.get()
			.then(function (doc) {
				let rowObjects = doc.data().rowObjects;
				rowObjects.forEach(object => {
					object.name = document.getElementById(`table-${object.id}`).value;
					object.platform = document.getElementById(
						`platform-${object.id}`
					).value;
					object.casino = document.getElementById(`casino-${object.id}`).value;
					if (object.id > 0) {
						object.counter = Number.parseInt(
							document.getElementById(`counter-${object.id}`).innerHTML
						);
						object.target = Number.parseInt(
							document.getElementById(`target-${object.id}`).value
						);
					}
				});

				db.collection('dailyChecking')
					.doc(userUID)
					.update({
						rowObjects: rowObjects,
					})
					.then(function () {
						target.blur();
					})
					.catch(function (error) {
						console.log(error);
					});
			})
			.catch(error => {
				console.log(error);
			});
	} else if (target.id === 'reset-button' && event.type === 'click') {
		let goal = document.querySelectorAll('.target');

		//getting the entire firestore array, because you can't update specific values in the cloud
		db.collection('dailyChecking')
			//changing the following userUID helps copying row state between users
			.doc(userUID)
			.get()
			.then(function (doc) {
				let rowObjects = doc.data().rowObjects;
				let tracking = doc.data().tracking;
				let time7daysAgo = new Date().getTime() / 1000 - 604800;
				let newTracking = tracking.filter(
					item => item.when.seconds > time7daysAgo
				);

				rowObjects.forEach(object => {
					object.counter = 0;
				});
				db.collection('dailyChecking')
					.doc(userUID)
					.update({
						rowObjects: rowObjects,
						tracking: newTracking,
					})
					.then(function () {
						document.querySelectorAll('.counter').forEach(counter => {
							counter.innerHTML = 0;
							counter.classList.remove('valid');
							counter.classList.add('invalid');
							target.blur();
						});
					})
					.catch(function (error) {
						console.log(error);
					});
			})
			.catch(error => {
				console.log(error);
			});
	} else if (target.classList.contains('target') && event.type === 'change') {
		let counter = document.getElementById(
				`counter-${target.id.substring(target.id.indexOf('-') + 1)}`
			),
			goal = target;

		let x = Number.parseInt(counter.innerHTML),
			y = goal.value;

		if (x >= y) {
			counter.classList.add('valid');
			counter.classList.remove('invalid');
		} else {
			counter.classList.add('invalid');
			counter.classList.remove('valid');
		}
	} else if (target.id === 'undo-button' && event.type === 'click') {
		target.setAttribute('disabled', 'disabled');
		allCounters = document.querySelectorAll('.counter');

		let currentAmount = 0;
		allCounters.forEach(
			item => (currentAmount += Number.parseInt(item.innerHTML))
		);

		//stopping users from deleting data from previous sessions - if the sum of all counters = 0, then nothing is removed
		if (currentAmount > 0) {
			db.collection('dailyChecking')
				//changing the following userUID helps copying row state between users
				.doc(userUID)
				.get()
				.then(function (doc) {
					let rowObjects = doc.data().rowObjects;
					let rowcount = doc.data().rowcount;
					let tracking = doc.data().tracking;
					let lastTracked = tracking.pop();

					//updating row counter value in the DB
					let i = 1;
					do {
						if (
							lastTracked.name === rowObjects[i].name &&
							lastTracked.platform === rowObjects[i].platform &&
							lastTracked.casino === rowObjects[i].casino
						) {
							rowObjects[i].counter--;
							break;
						}
						i++;
					} while (i < rowObjects.length - 1);
					db.collection('dailyChecking')
						.doc(userUID)
						.update({
							rowObjects: rowObjects,
							rowcount: rowcount,
							tracking: tracking,
						})
						.then(function () {
							let allGameTables = document.querySelectorAll('.table-name');
							let allPlatforms = document.querySelectorAll('.platform-name');
							let allCasinos = document.querySelectorAll('.casino-name');

							//i = 1 to ignore main-row
							let i = 1;

							do {
								if (
									lastTracked.name === allGameTables[i].value &&
									lastTracked.platform === allPlatforms[i].value &&
									lastTracked.casino === allCasinos[i].value
								) {
									let matchedCounter = document.getElementById(`counter-${i}`);
									let matchedCountersTarget = document.getElementById(
										`target-${i}`
									);

									matchedCounter.innerHTML--;

									if (matchedCounter.innerHTML >= matchedCountersTarget.value) {
										matchedCounter.classList.add('valid');
										matchedCounter.classList.remove('invalid');
									} else {
										matchedCounter.classList.add('invalid');
										matchedCounter.classList.remove('valid');
									}

									target.removeAttribute('disabled');
									break;
								}
								i++;
							} while (i < allGameTables.length - 1);
						})
						.catch(function (error) {
							console.log(error);
						});
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
};

//Added another eventlistener due to DOM Event delegation
checkRows.addEventListener('click', updateCounterAndOptions);
checkRows.addEventListener('keyup', updateCounterAndOptions);
checkRows.addEventListener('mouseover', updateCounterAndOptions);
checkRows.addEventListener('mouseout', updateCounterAndOptions);
checkRows.addEventListener('change', updateCounterAndOptions);

popOutBtn.onclick = function () {
	window.open(
		document.URL,
		'targetWindow',
		`width=990,
		height=982,
		left=2842,
		top=0`
	);
};

themeToggle.onclick = function () {
	if (themeSwitch.checked) {
		theBall.style.transitionDuration = '0.2s';
		styleSheet.href = 'css/light.css';
		document.cookie = 'color-schema=css/light.css;max-age=695520‬';
	} else {
		theBall.style.transitionDuration = '0.2s';
		styleSheet.href = 'css/dark.css';
		document.cookie = 'color-schema=css/dark.css;max-age=695520';
	}
};

menuToggleBtn.onclick = function () {
	overlay.style.display = 'block';
	hiddenMenu.style.visibility = 'visible';
	hiddenMenu.style.opacity = 1;
	menuToggleBtn.blur();
};

overlay.onclick = function () {
	overlay.style.display = 'none';
	hiddenMenu.style.visibility = 'hidden';
};
