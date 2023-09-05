import { serverAddNewClient, serverGetClienstList } from './serverFunctions.js';
import { renderTableClient } from './renderTableFunctions.js';
import { setContactInput } from './helpers.js';

/**
 * Создаёт объект на основе данных, полученных из формы добавления клиента.
 *
 * @param {HTMLFormElement} form - Форма добавления клиента.
 * @returns {Object} - Объект с данными клиента.
 */
function createObjectNewClient(form) {
  const surnameClient = document.getElementById('inputNewClientSurname');
  const nameClient = document.getElementById('inputNewClientName');
  const patronymicClient = document.getElementById('inputNewClientPatronymic');
  const contactsInput = form.querySelector('.modal-form__contacts').querySelectorAll('.modal-form-contacts__input');

  const client = {};

  client.name = nameClient.value.trim();
  client.surname = surnameClient.value.trim();
  client.lastName = patronymicClient.value.trim();

  client.contacts = [];

  if (contactsInput.length !== 0) {
    contactsInput.forEach((input) => {
      const contactType = input.getAttribute('aria-label');
      const contactValue = input.value.trim();

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

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    await serverAddNewClient(host, createObjectNewClient(form));

    arr = await serverGetClienstList(host);

    renderTableClient(host, arr);

    modal.close();
  });
}

/**
 * Открывает модальное окно добавления клиента.
 */
function openModalAddClient() {
  const btnAddClient = document.querySelector('.btn-add-client');
  const modal = document.getElementById('modalAddNewClient');

  btnAddClient.addEventListener('click', () => {
    modal.showModal();

    setContactInput(modal);
  });
}

// Экспортируем функции
export { createObjectNewClient, addNewClient, openModalAddClient };
