import countries from "./Countries.js";

const SQUARE = "■";

let btnSubmit;
let passConfirm;
let password;
let zip;
let mail;

const MAIL_REGEX = /[a-zA-Z0-9.]+@[a-z]{2,}\.(com|net|org)/;
const passChecks = (() => {
	const lowerCase = /^(?=.*[a-z]).*$/;
	const upperCase = /^(?=.*[A-Z]).*$/;
	const numbers = /^(?=.*\d).*$/;
	const specialCharacters = /^(?=.*[-! @#$%^&*()_+={[}\]|\:;"'<,>.?]).*$/;

	return { lowerCase, upperCase, numbers, specialCharacters };
})();

function capitalizeFirstLetter(str) {
	return `${str[0].toUpperCase()}${str.slice(1)}`;
}

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
	const err = document.querySelector("#zip+span");
	let isInvalid;

	if (zip.validity.valueMissing) {
		toggleErr(true, err, "■ Required field");
		isInvalid = true;
	} else if (zip.validity.rangeUnderflow) {
		toggleErr(true, err, `${SQUARE} Cannot be less than 0`);
		isInvalid = true;
	} else {
		toggleErr(false, err);
		isInvalid = false;
	}

	return isInvalid;
}

function isMailInvalid() {
	const value = mail.value;
	const err = document.querySelector(".mail .err-msg");
	let isInvalid;

	if (mail.validity.valueMissing) {
		toggleErr(true, err, "■ Required field");
		isInvalid = true;
	} else if (!MAIL_REGEX.test(value)) {
		toggleErr(true, err, "■ Invalid mail");
		isInvalid = true;
	} else {
		toggleErr(false, err);
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

const content = `
  <main>
    <form class="input-form" action="" method="" novalidate>
      <fieldset>
        <legend>Enter details</legend>
<div class="input-container mail">
        <label for="mail">Email: </label>
        <input type="email" id="mail" name="user_mail" value="" required/>
<span class="err-msg"></span>
</div>
<div class="input-container country">
        <label for="country">Country: </label>
<span class="err-msg"></span>
</div>
<div class="input-container zip">
        <label for="zip">Zip Code: </label>
        <input min="0" type="number" id="zip" name="user_zip_code" value="" required/>
<span class="err-msg"></span>
</div>
<div class="input-container pass">
        <label for="password">Password: </label>
        <input type="text" id="password" name="user_password" minlength="8" value="" required/>
<span class="err-msg"></span>
</div>
<div class="input-container pass-confirm">
        <label for="password_confirm">Confirm Password: </label>
        <input type="text" id="password_confirm" name="user_confirm_password" value="" required/>
<span class="err-msg"></span>
</div>
<button type="submit">Submit</button>
      </fieldset>
    </form>
  </main>
`;

function render() {
	document.querySelector("body").insertAdjacentHTML("afterbegin", content);

	// biome-ignore lint/complexity/noForEach: <explanation>
	countries.forEach((country) => {
		const option = document.createElement("option");
		option.value = country;
		option.textContent = capitalizeFirstLetter(country);
		select.appendChild(option);
	});

	const select = document.createElement("select");
	select.setAttribute("id", "country");
	document.querySelector(`label[for="country"]`).after(select);
}

export default function init() {
	// Add to the dom
	render();

	// set required variables
	btnSubmit = document.querySelector('button[type="submit"]');
	mail = document.querySelector(".mail input");
	zip = document.querySelector("#zip");
	password = document.querySelector("#password");
	passConfirm = document.querySelector("#password_confirm");

	// add eventListners
	btnSubmit.addEventListener("click", clickHandlerSubmit);
}
