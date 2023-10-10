function validationForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input[required]');
  const regexEmail = /^(?!.*@.*@.*$)(?!.*@.*--.*\..*$)(?!.*@.*-\..*$)(?!.*@.*-$)(.+@.+(\..{1,11})?)$/i;

  inputs.forEach((input) => {
    const errorText = input.parentElement.querySelector('.error-text');

    if (input.value === '') {
      errorText.classList.remove('hidden');

      input.classList.add('border-red-700', 'focus:border-red-700');

      isValid = false;
    } else if (input.classList.contains('modal-contacts-input')) {
      if (input.parentElement.querySelector('.select-text').textContent === 'Email') {
        if (!regexEmail.test(input.value)) {
          isValid = false;

          errorText.textContent = 'Неверный формат email';
          errorText.classList.remove('hidden');
        }
      }
    }
  });

  function handlerValidation(event) {
    event.preventDefault();

    const errorText = event.target.parentElement.querySelector('.error-text');
    errorText.classList.add('hidden');
    errorText.textContent = 'Заполните поле';

    event.target.classList.remove('border-red-700', 'focus:border-red-700');
  }

  form.addEventListener('input', handlerValidation);

  return isValid;
}

export { validationForm };
