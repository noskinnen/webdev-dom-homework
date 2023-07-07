
function letDisabledButton(expectedValue) {
  const buttonElement = document.getElementById("add-button");
    if (expectedValue === '') {
      buttonElement.disabled = true;
      buttonElement.classList.add('add-form-button_disabled')
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove('add-form-button_disabled')
    }
  };

  function letClearForm(form) {
    form.classList.remove('error')
  };

  export {letDisabledButton, letClearForm} 