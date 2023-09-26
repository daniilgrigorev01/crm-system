// Импортируем функции
import { serverAddNewClient, serverGetClientsList } from './serverFunctions.js';
import { renderTableClient } from './renderTableFunctions.js';
import { closeModal, handlerAddContact, setContactInput } from './helpers.js';

/**
 * Создаёт объект на основе данных, полученных из формы добавления клиента.
 *
 * @param {HTMLFormElement} form Форма добавления клиента.
 * @returns {object} Объект с данными клиента.
 */
function createObjectNewClient(form) {
  const surnameClient = form.querySelector('#surnameNewClient');
  const nameClient = form.querySelector('#nameNewClient');
  const patronymicClient = form.querySelector('#patronymicNewClient');
  const contactsInput = form.querySelector('.modal-block-contacts').querySelectorAll('.modal-contacts-input');

  // Создаём пустой объект
  const client = {};

  // Добавляем данные в объект
  client.name = nameClient.value.trim();
  client.surname = surnameClient.value.trim();
  client.lastName = patronymicClient.value.trim();

  if (contactsInput.length !== 0) {
    client.contacts = Array.from(contactsInput).map((input) => {
      const contactType = input.getAttribute('aria-label');
      const contactValue = input.value;

      return {
        type: contactType,
        value: contactValue,
      };
    });
  } else {
    client.contacts = [];
  }

  return client;
}

/**
 * Отправляет объект клиента на сервер и добавляет строку с данными в таблицу.
 *
 * @param {string} host URL сервера, на котором размещено API.
 * @param {HTMLFormElement} form Форма добавления клиента.
 * @param {Array<object>} arr Массив объектов.
 */
async function addNewClient(host, form, arr) {
  const modal = document.getElementById('modalAddNewClient');
  const btnAddContact = modal.querySelector('.modal-btn-add-contact');
  const btnSubmit = modal.querySelector('.action-btn');
  const errorText = modal.querySelector('.error-text');

  // Добавляем обработчик событий к форме оправки данных нового клиента
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    btnSubmit.querySelector('.animate-spin').classList.remove('hidden');

    const result = await serverAddNewClient(host, createObjectNewClient(form));

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
        arr = await serverGetClientsList(host);

        renderTableClient(host, arr);

        modal.close();
        form.reset();
        btnAddContact.removeEventListener('click', handlerAddContact);
    }

    btnSubmit.querySelector('.animate-spin').classList.add('hidden');
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

    // Очищаем блок с контактами
    blockInput.innerHTML = '';

    modal.showModal();

    // Запускаем функцию добавления контакта
    setContactInput(modal);
  });
}

// Экспортируем функции
export { createObjectNewClient, addNewClient, openModalAddClient };
