/**
 * Проверяет поля формы на валидность.
 *
 * @param {HTMLFormElement} form Форма, валидность которой нужно проверить.
 * @return {boolean} Валидность формы
 */
function validationForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input[required]');
  const regexEmail = /^(?!.*@.*@.*$)(?!.*@.*--.*\..*$)(?!.*@.*-\..*$)(?!.*@.*-$)(.+@.+(\..{1,11})?)$/i;

  // Проверяем каждое поле
  inputs.forEach((input) => {
    const errorText = input.parentElement.querySelector('.error-text');

    if (input.value === '') {
      errorText.classList.remove('hidden');

      input.classList.add('border-red-700', 'focus:border-red-700');

      isValid = false;
    }

    if (input.classList.contains('modal-contacts-input')) {
      // Проверяем правильность формата email
      const selectText = input.parentElement.querySelector('.select-text');

      if (selectText.textContent === 'Email' && !regexEmail.test(input.value)) {
        errorText.textContent = 'Неверный формат email';
        errorText.classList.remove('hidden');

        isValid = false;
      }
    }
  });

  /**
   * Убирает выделение ошибочного поля при вводе нового значения.
   *
   * @param {Event} event - Событие изменения поля ввода.
   */
  function resetValidation(event) {
    event.preventDefault();

    const errorText = event.target.parentElement.querySelector('.error-text');

    errorText.classList.add('hidden');
    errorText.textContent = 'Заполните поле';

    event.target.classList.remove('border-red-700', 'focus:border-red-700');
  }

  // Добавляем обработчик событий к форме
  form.addEventListener('input', resetValidation);

  return isValid;
}

// Экспортируем функцию
export { validationForm };
