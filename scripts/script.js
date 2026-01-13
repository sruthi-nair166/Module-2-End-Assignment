const inputs = document.querySelectorAll("input");
const nameError = document.getElementById("name-error-signup");
const emailErrorSignup = document.getElementById("email-error-signup");
const phoneError = document.getElementById("phone-error-signup");
const cityError = document.getElementById("city-error-signup");
const passwordErrorSignup = document.getElementById("password-error-signup");
const confirmPasswordError = document.getElementById(
  "confirm-password-error-signup"
);
const passwordShowSignup = document.getElementById("password-show-signup");
const passwordShowIconSignup = document.querySelector(
  "#password-show-signup i"
);
const confirmPasswordShow = document.getElementById(
  "confirm-password-show-signup"
);
const confirmPasswordShowIcon = document.querySelector(
  "#confirm-password-show-signup i"
);
const passwordInputFieldSignup = document.getElementById("password-signup");
const confirmPasswordInputField = document.getElementById(
  "confirm-password-signup"
);
const mainErrorSignup = document.getElementById("main-error");
const signupForm = document.getElementById("form-signup");

let nameInput;
let emailInputSignup;
let phoneInput;
let cityNameInput;
let passwordInputSignup;
let confirmPasswordInput;

function nameValidation(e) {
  if (!e.target.value.trim()) {
    nameError.textContent = "This field cannot be empty";
    nameInput = "";
    return;
  }
  nameError.textContent = "";
  nameInput = e.target.value.trim();
}

function emailValidation(e) {
  if (!e.target.value.trim()) {
    emailErrorSignup.textContent = "This field cannot be empty";
    emailInputSignup = "";
    return;
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(e.target.value)) {
    emailErrorSignup.textContent = "Please enter a valid email";
    emailInputSignup = "";
    return;
  }
  emailErrorSignup.textContent = "";
  emailInputSignup = e.target.value.trim();
}

function phoneValidation(input, e) {
  const numberInput = e.target.value.replace(/\D/g, "");
  input.value = numberInput;

  if (!numberInput.trim()) {
    phoneError.textContent = "This field cannot be empty";
    phoneInput = "";
    return;
  }

  if (e.target.value.length <= 10) {
    phoneError.textContent = "";
    phoneInput = numberInput;
  } else {
    phoneError.textContent = "Phone number cannot be more that 10 digits";
    phoneInput = "";
    return;
  }
}

function cityValidation(input, e) {
  const cityInput = e.target.value.replace(/[^A-Za-z\s]/g, "");
  input.value = cityInput;

  if (!cityInput.trim()) {
    cityError.textContent = "This field cannot be empty";
    cityNameInput = "";
    return;
  }
  cityError.textContent = "";
  cityNameInput = cityInput.trim();
}

function passwordValidation(e) {
  const password = e.target.value.trim();

  if (!password) {
    passwordErrorSignup.textContent = "This field cannot be empty";
    passwordInputSignup = "";
    return;
  }

  const hasLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  let messages = [];

  if (!hasLength) messages.push("at least 8 characters");
  if (!hasLetter) messages.push("a letter");
  if (!hasNumber) messages.push("a number");

  if (messages.length === 0) {
    passwordErrorSignup.textContent = "";
    passwordInputSignup = password;
  } else {
    passwordErrorSignup.textContent =
      "Password must contain " + messages.join(", ");
    passwordInputSignup = "";
  }

  if (passwordInputSignup === confirmPasswordInput) {
    confirmPasswordError.textContent = "";
  }
  console.log(passwordInputSignup);
}

function confirmPasswordValidation(e) {
  if (!e.target.value.trim()) {
    confirmPasswordError.textContent = "This field cannot be empty";
    confirmPasswordInput = "";
    return;
  }

  if (!passwordInputSignup) {
    return;
  }

  if (e.target.value.trim() !== passwordInputSignup) {
    confirmPasswordError.textContent = "Passwords do not match";
    confirmPasswordInput = "";
    return;
  }
  confirmPasswordError.textContent = "";
  confirmPasswordInput = e.target.value.trim();
  console.log(e.target.value.trim(), passwordInputSignup);
}

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (input.id) {
      case "full-name-signup":
        nameValidation(e);
        break;
      case "email-signup":
        emailValidation(e);
        break;
      case "phone-signup":
        phoneValidation(input, e);
        break;
      case "city-signup":
        cityValidation(input, e);
        break;
      case "password-signup":
        passwordValidation(e);
        break;
      case "confirm-password-signup":
        confirmPasswordValidation(e);
        break;
    }
  });
});

passwordShowSignup.addEventListener("click", () => {
  if (passwordInputFieldSignup.type === "password") {
    passwordInputFieldSignup.type = "text";
    passwordShowIconSignup.classList.remove("fa-eye");
    passwordShowIconSignup.classList.add("fa-eye-slash");
    console.log(passwordShowIconSignup);
  } else {
    passwordInputFieldSignup.type = "password";
    passwordShowIconSignup.classList.remove("fa-eye-slash");
    passwordShowIconSignup.classList.add("fa-eye");
  }
});

confirmPasswordShow.addEventListener("click", () => {
  if (confirmPasswordInputField.type === "password") {
    confirmPasswordInputField.type = "text";
    confirmPasswordShowIcon.classList.remove("fa-eye");
    confirmPasswordShowIcon.classList.add("fa-eye-slash");
  } else {
    confirmPasswordInputField.type = "password";
    confirmPasswordShowIcon.classList.remove("fa-eye-slash");
    confirmPasswordShowIcon.classList.add("fa-eye");
  }
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    nameInput &&
    emailInputSignup &&
    phoneInput &&
    cityNameInput &&
    passwordInputSignup &&
    confirmPasswordInput
  ) {
    alert("Signup Successful! Your new Account has been created.");

    const userData = {
      name: nameInput,
      email: emailInputSignup,
      phone: phoneInput,
      city: cityNameInput,
      password: passwordInputSignup,
    };
    localStorage.setItem("user", JSON.stringify(userData));

    window.location.href = "SignIn.html";
  } else {
    mainErrorSignup.style.display = "block";
    mainErrorSignup.textContent =
      "Something went wrong. Please recheck the fields with errors";
  }
});
