// Импортируем функции
import { serverChangeClient, serverDeleteClient, serverGetClient, serverGetClientsList } from './serverFunctions.js';
import { changeTypeInput, closeModal, createContactInputBlock, setContactInput } from './helpers.js';
import { renderTableClient } from './renderTableFunctions.js';
import { validationForm } from './validationFunctions/validationFunctions.js';

/**
 * Открывает модальное окно изменения клиента.
 *
 * @param {string} host URL сервера, на котором размещено API.
 * @param {string} id ID клиента, данные которого необходимо изменить.
 * @return {Promise<object>} Объект клиента, данные которого необходимо изменить.
 */
async function openModalChangeClient(host, id) {
  const modal = document.getElementById('modalChangeClient');

  // Получаем данные клиента
  const client = await serverGetClient(host, id);

  if (client) {
    modal.classList.add('is-open');
    modal.showModal();

    window.history.pushState({ id }, '', `?id=${id}`);

    setContactInput(modal);

    closeModal(modal);

    return client;
  }
}

/**
 * Заполняет форму изменения клиента начальными данными.
 *
 * @param {string} host URL сервера, на котором размещено API.
 * @param {string} id ID клиента, данные которого необходимо изменить.
 */
async function getChangeClient(host, id) {
  const modal = document.getElementById('modalChangeClient');
  const blockContacts = modal.querySelector('.modal-block-contacts__wrapper');

  const idClient = modal.querySelector('.id-client');
  const inputName = modal.querySelector('#nameChangeClient');
  const inputSurname = modal.querySelector('#surnameChangeClient');
  const inputPatronymic = modal.querySelector('#patronymicChangeClient');

  // Получаем объект клиента
  const client = await openModalChangeClient(host, id);

  // Заполняем форму данными
  idClient.innerText = 'ID:  ' + client.id.slice(-6);
  inputName.value = client.name;
  inputSurname.value = client.surname;
  inputPatronymic.value = client.lastName;

  const contactsList = client.contacts;

  blockContacts.innerHTML = '';

  if (contactsList !== 0) {
    for (const contact of contactsList) {
      const contactType = contact.type;
      const contactValue = contact.value;
      const contactInput = createContactInputBlock(modal, contactType, contactValue);
      const selectContact = contactInput.querySelector('.form-select');

      changeTypeInput(selectContact);

      blockContacts.append(contactInput);
    }
  }
}

async function syncChangeClient(host) {
  const search = document.location.search;

  if (search !== '') {
    const id = search.match(/\d/g).join('');

    if ((await serverGetClient(host, id)) !== 'Client Not Found') {
      await openModalChangeClient(host, id);
      await getChangeClient(host, id);
    }
  }
}

/**
 * Изменяет данные клиента.
 *
 * @param {string} host URL сервера, на котором размещено API.
 * @param {object} obj Объект с изначальными данными клиента.
 */
function setChangeClient(host, obj) {
  const modal = document.getElementById('modalChangeClient');
  const form = modal.querySelector('#formChangeClient');
  const inputName = form.querySelector('#nameChangeClient');
  const inputSurname = form.querySelector('#surnameChangeClient');
  const inputPatronymic = form.querySelector('#patronymicChangeClient');
  const deleteBtn = form.querySelector('.cancel-btn');
  const errorText = modal.querySelector('.error-text');

  /**
   * Изменяет данные клиента при отправке формы.
   *
   * @param {Event} event - Событие отправки формы.
   */
  async function handlerSubmitChange(event) {
    event.preventDefault();

    if (validationForm(form)) {
      // Изменяем данные в объекте
      obj.name = inputName.value.trim();
      obj.surname = inputSurname.value.trim();
      obj.lastName = inputPatronymic.value.trim();

      const contactsInput = form.querySelectorAll('.modal-contacts-input');

      if (contactsInput.length !== 0) {
        obj.contacts = Array.from(contactsInput).map((input) => {
          const contactType = input.getAttribute('aria-label');
          const contactValue = input.value;

          return {
            type: contactType,
            value: contactValue,
          };
        });
      } else {
        obj.contacts = [];
      }

      const result = await serverChangeClient(host, obj);

      // Если от сервера пришёл ответ с ошибкой, то выводим ее текст, иначе запускаем рендер таблицы с новыми данными
      switch (result) {
        case 'Не указано имя':
          errorText.textContent = 'Не указано имя';
          break;
        case 'Не указана фамилия':
          errorText.textContent = 'Не указана фамилия';
          break;
        case 'Не все добавленные контакты полностью заполнены':
          errorText.textContent = 'Не все добавленные контакты полностью заполнены';
          break;
        default:
          modal.close();
          form.reset();
          modal.classList.remove('is-open');

          form.removeEventListener('submit', handlerSubmitChange);

          renderTableClient(host, await serverGetClientsList(host));
      }
    }
  }

  /**
   * Удаляет клиента при клике на кнопку.
   */
  async function handleDelete() {
    await serverDeleteClient(host, obj.id);

    deleteBtn.removeEventListener('click', handleDelete);
    form.removeEventListener('submit', handlerSubmitChange);

    modal.close();
    form.reset();

    window.history.replaceState({}, '', document.location.pathname);

    renderTableClient(host, await serverGetClientsList(host));
  }

  // Добавляем обработчики событий к форме и кнопке удаления
  deleteBtn.addEventListener('click', handleDelete);
  form.addEventListener('submit', handlerSubmitChange);
}

// Экспортируем функции
export { getChangeClient, setChangeClient, syncChangeClient };
