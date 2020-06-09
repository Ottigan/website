`use strict`;

// Your web app's Firebase configuration
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
	checkRows = document.querySelector("#checkrows"),
	rowManip = document.querySelector("#row-manipulator"),
	gameTableNames = document.getElementById("names"),
	casinoNames = document.getElementById("casinos"),
	auth = firebase.auth(),
	db = firebase.firestore();

let userUID;
let tablesDB;
let casinosDB;
let inputElements = document.querySelectorAll(".inputElement");

//Add login event 
loginButton.addEventListener('click', function () {
	const email = txtUser.value;
	const pass = txtPass.value;
	const authPromise = auth.signInWithEmailAndPassword(email, pass);

	authPromise
		.then(
			console.log('Login successful!')
		)
		.catch(error => console.log(error.message))
})

firebase.auth().onAuthStateChanged(dailyCheckingUser => {
	if (dailyCheckingUser) {
		//current user valid option: firebase.auth().currentUser.uid
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
		greeting.style.cssText = 'margin-bottom: -2px; align-self: flex-end; color: white; visibility: visible; font-family: Georgia, "Times New Roman", Times, serif; font-weight: 400';
		logoutButton.before(greeting);


		logoutButton.style.display = 'inline';
		txtUser.style.display = 'none';
		txtPass.style.display = 'none';
		loginButton.style.display = 'none';

		const getData = function () {
			db.collection("dailyChecking")
				.doc("tables")
				.get()
				.then(function (doc) {
					tablesDB = doc.data().names;
				})
				.catch(function (error) {});

			db.collection("dailyChecking")
				.doc("casinos")
				.get()
				.then(function (doc) {
					casinosDB = doc.data().names;
				})
				.catch(function (error) {});

			db.collection("dailyChecking")
				.doc(userUID)
				.get()
				.then(function (doc) {
					if (doc.exists) {
						let rows = doc.data().rowcount;
						let rowObjects = doc.data().rowObjects;
						let i = 0;
						do {
							if (i === 0) {
								document.querySelector(`#table-${ i }`).value = rowObjects[i].name;
								document.querySelector(`#platform-${ i }`).value =
									rowObjects[i].platform;
								document.querySelector(`#casino-${ i }`).value = rowObjects[i].casino;
								document.querySelector(`#counter-${ i }`).innerHTML = rowObjects[i].counter || 0;
								document.querySelector(`#target-${ i }`).value = rowObjects[i].target;
							} else if (i > 0) {
								const rowItem = document.createElement("form");
								rowItem.classList.add("flex", "jc-c", "table-row");
								rowItem.innerHTML = `<div>
          <input type="text" name="table" pattern="[a-zA-Z0-9 ]+" list="names" class="inputElement highlight-this" autocomplete="off" id="table-${
									rowObjects[i].id
									}" value="${ rowObjects[i].name }"/>
        </div>
        <div>
              <input id="platform-${
									rowObjects[i].id
									}" class="highlight-this" value="${
									rowObjects[i].platform
									}" name="platform" type="text" list="platforms" autocomplete="off"/>
            </div>
            <div>
              <input type="text" name="casino" list="casinos" class="inputElement highlight-this" autocomplete="off" id="casino-${
									rowObjects[i].id
									}" value="${ rowObjects[i].casino.toLowerCase() }"/>
            </div>
            <span id="counter-${
									rowObjects[i].id
									}" class="counter highlight-this">${ rowObjects[i].counter || 0 }</span>
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
						inputElements = document.querySelectorAll("input");
					}
				})
				.catch(function (error) {
					console.log("Error getting document:", error);
				});
		};
		getData();
	} else {
		logoutButton.style.display = 'none';
		txtUser.style.display = 'inline';
		txtPass.style.display = 'inline';
		loginButton.style.display = 'inline';
	}
})

logoutButton.addEventListener('click', function () {
	auth.signOut()
		.then(function () {
			document.querySelector('h6').remove();
			logoutButton.classList = 'hide-logout'
			document.getElementById('table-0').value = '';
			document.getElementById('platform-0').value = '';
			document.getElementById('casino-0').value = '';
			document.getElementById('counter-0').innerHTML = '';
			document.getElementById('target-0').value = '';
			document.querySelectorAll('.table-row').forEach(row => row.remove())
		})
})

const manipRows = (event) => {
	let target = event.target;
	let row = target.parentElement.previousElementSibling;
	if (target.innerHTML === "Remove" && row.classList.contains("table-row")) {
		db.collection("dailyChecking")
			.doc(userUID)
			.get()
			.then(function (doc) {
				let data = doc.data().rowcount;
				let objectArray = doc.data().rowObjects;
				let deleteObject = objectArray.find((value) => value.id === data);
				if (data > 0) {
					db.collection("dailyChecking")
						.doc(userUID)
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
				console.log("Error getting document:", error);
			});
	} else if (target.innerHTML === "Add") {
		db.collection("dailyChecking")
			.doc(userUID)
			.update({
				rowcount: firebase.firestore.FieldValue.increment(1),
			})
			.then(function () {
				db.collection("dailyChecking")
					.doc(userUID)
					.get()
					.then(function (doc) {
						let data = doc.data().rowcount;
						const rowItem = document.createElement("form");
						rowItem.classList.add("flex", "jc-c", "table-row");
						rowItem.innerHTML = `<div>
          <input type="text" name="table" list="names" class="inputElement" autocomplete="off" pattern="[a-zA-Z0-9]+" id="table-${data }" />
        </div>
        <div>
          <input id="platform-${data }" name="platform" type="text" list="platforms" autocomplete="off"/>
        </div>
        <div>
          <input type="text" name="casino" id="casino-${data }" list="casinos" class="inputElement" autocomplete="off"/>
        </div>
        <span class="counter">0</span>
        <input type="number" class="target" maxlength="2" min="1" max="12" />
        <button id="${data }" class="submitButton" type="button">
          Submit
        </button>`;
						rowManip.before(rowItem);
						db.collection("dailyChecking")
							.doc(userUID)
							.update({
								rowObjects: firebase.firestore.FieldValue.arrayUnion({
									id: data,
									name: "",
									platform: "",
									casino: ""
								})
							})
							.then(function () {
								console.log("Row Object added");
							})
							.catch(function (error) {
								console.error("Error adding Object row: ", error);
							});
					})
					.catch(function (error) {
						console.log("Error getting document:", error);
					});
			})
			.catch(function (error) {
				console.error("Error adding a row: ", error);
			});
	}
};

checkRows.addEventListener("click", manipRows);

const updateCounterAndOptions = (event) => {
	let target = event.target;
	//Logic to ignore mouse clicks due to them being undefined
	let eventKey = event.key ? event.key : 0;

	if (
		eventKey !== "Shift" &&
		event.type !== "mouseover" &&
		event.type !== "mouseout"
	) {
		gameTableNames.innerHTML = "";
		casinoNames.innerHTML = "";
	}

	if (
		(target.classList.contains("inputElement") &&
			event.type === "keyup" &&
			eventKey.length === 1) ||
		eventKey === "Backspace"
	) {
		gameTableNames.innerHTML = "";
		tablesDB.forEach((value) => {
			if (
				gameTableNames.childElementCount <= 10 &&
				value.toLowerCase().includes(target.value.toLowerCase())
			) {
				let namesOptionItem = document.createElement("option");
				namesOptionItem.value = value;

				gameTableNames.append(namesOptionItem);
			}
		});
		casinoNames.innerHTML = "";
		casinosDB.forEach((value) => {
			if (
				casinoNames.childElementCount <= 10 &&
				value.toLowerCase().includes(target.value.toLowerCase())
			) {
				let casinosOptionItem = document.createElement("option");
				casinosOptionItem.value = value;

				casinoNames.append(casinosOptionItem);
			}
		});
	}

	if (target.classList.contains("highlight-this")) {
		let indexID = target.id.substring(target.id.indexOf("-") + 1),
			tableName = document.querySelector(`#table-${ indexID }`),
			platform = document.querySelector(`#platform-${ indexID }`),
			casino = document.querySelector(`#casino-${ indexID }`),
			counter = document.querySelector(`#counter-${ indexID }`),
			targetNumber = document.querySelector(`#target-${ indexID }`),
			submitButton = document.getElementById(`${ indexID }`);

		if (event.type === "mouseover") {
			tableName.classList.add('highlighted-row');
			platform.classList.add('highlighted-row');
			casino.classList.add('highlighted-row');
			counter.classList.add('highlighted-row');
			targetNumber.classList.add('highlighted-row');
			submitButton.classList.add('highlighted-row');
		} else if (event.type === "mouseout") {
			tableName.classList.remove('highlighted-row');
			platform.classList.remove('highlighted-row');
			casino.classList.remove('highlighted-row');
			counter.classList.remove('highlighted-row');
			targetNumber.classList.remove('highlighted-row');
			submitButton.classList.remove('highlighted-row');
		}
	}

	if (target.classList.contains("submitButton") && event.type === "click") {

		let tableName = document.querySelector(`#table-${ target.id }`).value,
			platform = document.querySelector(`#platform-${ target.id }`).value,
			casino = document.querySelector(`#casino-${ target.id }`).value,
			counter = document.querySelector(`#counter-${ target.id }`),
			goal = document.querySelector(`#target-${ target.id }`);

		let x = counter.innerHTML,
			y = goal.value;
		x++;
		counter.innerHTML = x;

		if (x >= y) {
			counter.classList.add("valid");
		}

		console.log(counter)
		console.log(goal)

		//getting the entire firestore array, because you can't update specific values in the cloud
		db.collection("dailyChecking")
			//changing the following userUID helps copying row state between users
			.doc(userUID)
			.get()
			.then(function (doc) {
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
				db.collection("dailyChecking")
					.doc(userUID)
					.update({
						rowObjects: rowObjects,
						rowcount: rowcount
					})
					.then(function () {
						if (tableName != "" && platform != "" && casino != "") {
							db.collection("dailyChecking")
								.doc("database")
								.update({
									tracking: firebase.firestore.FieldValue.arrayUnion({
										name: tableName,
										platform: platform,
										casino: casino,
										qa: userUID,
										when: clientTime
									}),
								})
								.then(function () {
									console.log("Tracking DB updated");

								})
								.catch(function (error) {
									console.error("Error updating DB: ", error);
								});
						}
					})
					.catch(function (error) {
						console.log(error);
					});
			})
			.catch((error) => {
				console.log(error);
			});
	}
};

//Added another eventlistener due to DOM Event delegation
checkRows.addEventListener("click", updateCounterAndOptions);
checkRows.addEventListener("keyup", updateCounterAndOptions);
checkRows.addEventListener("mouseover", updateCounterAndOptions);
checkRows.addEventListener("mouseout", updateCounterAndOptions);