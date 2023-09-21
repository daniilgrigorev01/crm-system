import { serverAddNewClient, serverGetClienstList } from './serverFunctions.js';
import { renderTableClient } from './renderTableFunctions.js';
import { closeModal, handlerAddContact, setContactInput } from './helpers.js';

/**
 * Создаёт объект на основе данных, полученных из формы добавления клиента.
 *
 * @param {HTMLFormElement} form - Форма добавления клиента.
 * @returns {Object} - Объект с данными клиента.
 */
function createObjectNewClient(form) {
  const surnameClient = document.getElementById('surnameNewClient');
  const nameClient = document.getElementById('nameNewClient');
  const patronymicClient = document.getElementById('patronymicNewClient');
  const contactsInput = form.querySelector('.modal-block-contacts').querySelectorAll('.modal-contacts-input');

  const client = {};

  client.name = nameClient.value.trim();
  client.surname = surnameClient.value.trim();
  client.lastName = patronymicClient.value.trim();

  client.contacts = [];

  if (contactsInput.length !== 0) {
    contactsInput.forEach((input) => {
      const contactType = input.getAttribute('aria-label');
      const contactValue = input.value;

      client.contacts.push({
        type: contactType,
        value: contactValue,
      });
    });
  }

  return client;
}

/**
 * Отправляет объект клиента на сервер и добавляет строку с данными в таблицу.
 *
 * @param {string} host - URL сервера, на котором размещено API.
 * @param {HTMLFormElement} form - Форма добавления клиента.
 * @param {Object[]} arr - Массив объектов.
 * @returns {Promise<void>}
 */
async function addNewClient(host, form, arr) {
  const modal = document.getElementById('modalAddNewClient');
  const btnAddContact = modal.querySelector('.modal-btn-add-contact');
  const errorText = modal.querySelector('.error-text');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const result = await serverAddNewClient(host, createObjectNewClient(form));

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
        arr = await serverGetClienstList(host);

        renderTableClient(host, arr);

        modal.close();
        form.reset();
        btnAddContact.removeEventListener('click', handlerAddContact);
    }
  });
}

/**
 * Открывает модальное окно добавления клиента.
 */
function openModalAddClient() {
  const btnAddClient = document.getElementById('btnAddNewClient');
  const modal = document.getElementById('modalAddNewClient');
  const blockInput = modal.querySelector('.modal-block-contacts__wrapper');

  btnAddClient.addEventListener('click', () => {
    closeModal(modal);

    blockInput.innerHTML = '';

    modal.showModal();

    setContactInput(modal);
  });
}

// Экспортируем функции
export { createObjectNewClient, addNewClient, openModalAddClient };
