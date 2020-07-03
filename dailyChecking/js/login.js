'use strict';

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

const auth = firebase.auth(),
	loginForm = document.getElementById('login-form'),
	user = document.getElementById('email'),
	password = document.getElementById('password'),
	loginBtn = document.getElementById('login-btn'),
	resetBtn = document.getElementById('reset-password-btn');

// Add login event
loginForm.addEventListener('submit', event => {
	event.preventDefault();
	const email = user.value;
	const pass = password.value;
	const authPromise = auth.signInWithEmailAndPassword(email, pass);

	authPromise
		.then(function () {
			window.location.replace('main.html');
		})
		.catch(error => {
			console.error(error.message);
			if (
				error.message ===
				'There is no user record corresponding to this identifier. The user may have been deleted.'
			) {
				user.classList.add('empty-value');
				user.focus();
			} else if (
				error.message ===
				'The password is invalid or the user does not have a password.'
			) {
				password.classList.add('empty-value');
				password.focus();
			}
		});
});

resetBtn.onclick = () => {
	function message(text, color) {
		let result = document.createElement('p');
		result.innerHTML = text;
		result.style.cssText = `margin-left: 15px; color: ${color}; font-family: "Roboto", sans-serif; font-weight: 700; opacity: 1;`;
		resetBtn.after(result);
		setInterval(() => {
			result.style.opacity -= 0.05;
		}, 200);
		setTimeout(() => {
			result.remove();
		}, 4000);
	}

	auth
		.sendPasswordResetEmail(user.value)
		.then(function () {
			resetBtn.blur();
			message('Sent!', 'green');
		})
		.catch(function (error) {
			console.log(error);
			message('Wrong email!', 'red');
			user.focus();
		});
};
