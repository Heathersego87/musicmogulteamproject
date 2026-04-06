const form = document.querySelector("#studentForm");
const nameInput = document.querySelector("#fname");
const skillLevelInput = document.querySelector("#skillLevel");
const emailInput = document.querySelector("#eaddress");

const nameError = document.querySelector("#fnameError");
const skillLevelError = document.querySelector("#skillLevelError");
const emailError = document.querySelector("#eaddressError");
const formSuccess = document.querySelector("#formSuccess");

function clearMessages() {
    nameError.textContent = "";
    skillLevelError.textContent = "";
    emailError.textContent = "";
    formSuccess.textContent = "";
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function submitForm(event) {
    event.preventDefault();
    clearMessages();

    const nameValue = nameInput.value.trim();
    const skillLevelValue = skillLevelInput.value;
    const emailValue = emailInput.value.trim();

    let isValid = true;

    if (nameValue === "") {
        nameError.textContent = "Please enter your name.";
        isValid = false;
    }

    if (skillLevelValue === "") {
        skillLevelError.textContent = "Please select a skill level.";
        isValid = false;
    }
    
    if (emailValue === "") {
        emailError.textContent = "Please enter your email address.";
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    formSuccess.textContent = "Form submitted successfully.";
    form.reset();
}
form.addEventListener("submit", submitForm);