// Handles the form submission event //
function submitForm(event) {
    // 1. Keep the form from doing what it normally would (reloading the page)
    event.preventDefault();

    // 5. Generate the success message
    const successMessage = successTemplate(info);
}

// Attach the event listener to the form for a 'submit' event
document.forms[0].addEventListener('submit', submitForm);