import { validationForm } from './validationFunctions.js';

describe('Function validationForm:', () => {
  test('должна вернуть true при заполненных обязательных полях', () => {
    const formHTML = `
      <form>
        <div>
          <input type="text" required value='Иванов'>
          <span class='error-text hidden'>Заполните поле</span>
        </div>
        <div>
          <input type="text" required value='Василий'>
          <span class='error-text hidden'>Заполните поле</span>
        </div>
        <div>
          <span class='select-text'>Телефон</span>
          <input class='modal-contacts-input' type="tel" required value='+79999999999'>
          <span class='error-text hidden'>Заполните поле</span>
        </div>
        <div>
          <span class='select-text'>Email</span>
          <input class='modal-contacts-input' type="email" required value='test@test.ru'>
          <span class='error-text hidden'>Заполните поле</span>
        </div>
      </form>
    `;

    const formElement = new DOMParser().parseFromString(formHTML, 'text/html');
    const form = formElement.querySelector('form');

    expect(validationForm(form)).toBeTruthy();
  });

  test('должна вернуть false при одном пустом обязательном поле', () => {
    const formHTML = `
      <form>
        <div>
          <input type="text" required value='Иванов'>
          <span class='error-text hidden'>Заполните поле</span>
        </div>
        <div>
          <input type="text" required value=''>
          <span class='error-text hidden'>Заполните поле</span>
        </div>
        <div>
          <span class='select-text'>Телефон</span>
          <input class='modal-contacts-input' type="tel" required value='+79999999999'>
          <span class='error-text hidden'>Заполните поле</span>
        </div>
        <div>
          <span class='select-text'>Email</span>
          <input class='modal-contacts-input' type="email" required value='test@test.ru'>
          <span class='error-text hidden'>Заполните поле</span>
        </div>
      </form>
    `;

    const formElement = new DOMParser().parseFromString(formHTML, 'text/html');
    const form = formElement.querySelector('form');

    expect(validationForm(form)).toBeFalsy();
  });

  test('должна вернуть false при нескольких пустых обязательных полях', () => {
    const formHTML = `
      <form>
        <div>
          <input type="text" required value='Иванов'>
          <span class='error-text hidden'>Заполните поле</span>
        </div>
        <div>
          <input type="text" required value=''>
          <span class='error-text hidden'>Заполните поле</span>
        </div>
        <div>
          <span class='select-text'>Телефон</span>
          <input class='modal-contacts-input' type="tel" required value='+79999999999'>
          <span class='error-text hidden'>Заполните поле</span>
        </div>
        <div>
          <span class='select-text'>Email</span>
          <input class='modal-contacts-input' type="email" required value=''>
          <span class='error-text hidden'>Заполните поле</span>
        </div>
      </form>
    `;

    const formElement = new DOMParser().parseFromString(formHTML, 'text/html');
    const form = formElement.querySelector('form');

    expect(validationForm(form)).toBeFalsy();
  });

  test('должна вернуть false при одном незаполненном контакте из нескольких', () => {
    const formHTML = `
      <form>
        <div>
          <input type="text" required value='Иванов'>
          <span class='error-text hidden'>Заполните поле</span>
        </div>
        <div>
          <input type="text" required value='Иван'>
          <span class='error-text hidden'>Заполните поле</span>
        </div>
        <div>
          <span class='select-text'>Телефон</span>
          <input class='modal-contacts-input' type="tel" required value=''>
          <span class='error-text hidden'>Заполните поле</span>
        </div>
        <div>
          <span class='select-text'>Email</span>
          <input class='modal-contacts-input' type="email" required value='test@test.ru'>
          <span class='error-text hidden'>Заполните поле</span>
        </div>
      </form>
    `;

    const formElement = new DOMParser().parseFromString(formHTML, 'text/html');
    const form = formElement.querySelector('form');

    expect(validationForm(form)).toBeFalsy();
  });

  test('должна вернуть false при неправильном формате email', () => {
    const formHTML = `
      <form>
        <div>
          <input type="text" required value='Иванов'>
          <span class='error-text hidden'>Заполните поле</span>
        </div>
        <div>
          <input type="text" required value='Иван'>
          <span class='error-text hidden'>Заполните поле</span>
        </div>
        <div>
          <span class='select-text'>Телефон</span>
          <input class='modal-contacts-input' type="tel" required value='+79999999999'>
          <span class='error-text hidden'>Заполните поле</span>
        </div>
        <div>
          <span class='select-text'>Email</span>
          <input class='modal-contacts-input' type="email" required value='test.ru'>
          <span class='error-text hidden'>Заполните поле</span>
        </div>
      </form>
    `;

    const formElement = new DOMParser().parseFromString(formHTML, 'text/html');
    const form = formElement.querySelector('form');

    expect(validationForm(form)).toBeFalsy();
  });
});
