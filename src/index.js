import render from "./scripts/Form.js";
import "./css/styles.css";

render();

const SQUARE = "■";
const btnSubmit = document.querySelector('button[type="submit"]');

// variables for email
const MAIL_REGEX = /[a-zA-Z0-9.]+@[a-z]{2,}\.(com|net|org)/;
const errorMessage = document.querySelector(".mail .err-msg");
const mail = document.querySelector(".mail input");

// variables for zipcode
const zip = document.querySelector("#zip");

//variables for passwword
const passChecks = (() => {
	const lowerCase = /^(?=.*[a-z]).*$/;
	const upperCase = /^(?=.*[A-Z]).*$/;
	const numbers = /^(?=.*\d).*$/;
	const specialCharacters = /^(?=.*[-! @#$%^&*()_+={[}\]|\:;"'<,>.?]).*$/;

	return { lowerCase, upperCase, numbers, specialCharacters };
})();
const password = document.querySelector("#password");

function toggleErr(show, element, message) {
	if (show) {
		element.textContent = message;
		element.style.display = "inline";
	} else {
		element.textContent = "";
		element.style.display = "none";
	}
}

function isZipCodeInvalid() {
	const errElement = document.querySelector("#zip+span");
	let isInvalid;

	if (zip.validity.valueMissing) {
		toggleErr(true, errElement, "■ Required field");
		isInvalid = true;
	} else if (zip.validity.rangeUnderflow) {
		toggleErr(true, errElement, `${SQUARE} Cannot be less than 0`);
		isInvalid = true;
	} else {
		toggleErr(false, errElement);
		isInvalid = false;
	}

	return isInvalid;
}

function isMailInvalid() {
	const value = mail.value;
	let isInvalid;

	if (mail.validity.valueMissing) {
		toggleErr(true, errorMessage, "■ Required field");
		isInvalid = true;
	} else if (!MAIL_REGEX.test(value)) {
		toggleErr(true, errorMessage, "■ Invalid mail");
		isInvalid = true;
	} else {
		toggleErr(false, errorMessage);
		isInvalid = false;
	}

	return isInvalid;
}

function isPasswordInvalid() {
	let isInvalid;
	const value = password.value;
	const err = document.querySelector("#password+span");

	if (password.validity.valueMissing) {
		toggleErr(true, err, `${SQUARE} Required field`);
		isInvalid = true;
	} else if (password.validity.tooShort) {
		toggleErr(true, err, `${SQUARE} Password must be 8 characters long`);
		isInvalid = true;
	} else if (!passChecks.lowerCase.test(value)) {
		toggleErr(true, err, `${SQUARE} Password must contain a lower case letter`);
		isInvalid = true;
	} else if (!passChecks.upperCase.test(value)) {
		toggleErr(
			true,
			err,
			`${SQUARE} Password must contain an upper case letter`,
		);
		isInvalid = true;
	} else if (!passChecks.numbers.test(value)) {
		toggleErr(true, err, `${SQUARE} Password must contain a number`);
		isInvalid = true;
	} else if (!passChecks.specialCharacters.test(value)) {
		toggleErr(
			true,
			err,
			`${SQUARE} Password must contain a special character for example "!$.\[\]"`,
		);
		isInvalid = true;
	} else {
		toggleErr(false, err);
		isInvalid = false;
	}

	return isInvalid;
}

const passConfirm = document.querySelector("#password_confirm");
function isPasswordConfirmInvalid() {
	const err = document.querySelector("#password_confirm+span");
	const value = passConfirm.value;
	let isInvalid;

	if (passConfirm.validity.valueMissing) {
		toggleErr(true, err, `${SQUARE} Required field`);
		isInvalid = true;
	} else if (password.value !== value) {
		toggleErr(true, err, `${SQUARE} Passwords don't match`);
		isInvalid = true;
	} else {
		toggleErr(false, err);
		isInvalid = false;
	}

	return isInvalid;
}

function clickHandlerSubmit(e) {
	let validity = true;
	if (isMailInvalid()) validity = false;
	if (isZipCodeInvalid()) validity = false;
	if (isPasswordInvalid()) validity = false;
	if (isPasswordConfirmInvalid()) validity = false;
	if (!validity) e.preventDefault();
}

btnSubmit.addEventListener("click", clickHandlerSubmit);
