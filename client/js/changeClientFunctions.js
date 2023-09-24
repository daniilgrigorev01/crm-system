import { serverChangeClient, serverDeleteClient, serverGetClienstList, serverGetClient } from './serverFunctions.js';
import { changeTypeInput, closeModal, createContactInputBlock, setContactInput } from './helpers.js';
import { renderTableClient } from './renderTableFunctions.js';

async function openModalChangeClient(host, id) {
  const modal = document.getElementById('modalChangeClient');
  const client = await serverGetClient(host, id);

  if (client) {
    modal.showModal();

    setContactInput(modal);

    closeModal(modal);

    return client;
  }
}

async function getChangeClient(host, id) {
  const modal = document.getElementById('modalChangeClient');
  const blockContacts = modal.querySelector('.modal-block-contacts__wrapper');

  const idClient = modal.querySelector('.id-client');
  const inputName = document.getElementById('nameChangeClient');
  const inputSurname = document.getElementById('surnameChangeClient');
  const inputPatronymic = document.getElementById('patronymicChangeClient');

  const client = await openModalChangeClient(host, id);

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

function setChangeClient(host, obj) {
  const form = document.getElementById('formChangeClient');
  const inputName = document.getElementById('nameChangeClient');
  const inputSurname = document.getElementById('surnameChangeClient');
  const inputPatronymic = document.getElementById('patronymicChangeClient');
  const modal = document.getElementById('modalChangeClient');
  const deleteBtn = form.querySelector('.cancel-btn');
  const errorText = modal.querySelector('.error-text');

  async function handlerSubmitChange(event) {
    event.preventDefault();

    obj.name = inputName.value.trim();
    obj.surname = inputSurname.value.trim();
    obj.lastName = inputPatronymic.value.trim();

    obj.contacts = [];

    const contactsInput = form.querySelectorAll('.modal-contacts-input');

    if (contactsInput.length !== 0) {
      contactsInput.forEach((input) => {
        const contactType = input.getAttribute('aria-label');
        const contactValue = input.value.trim();

        obj.contacts.push({
          type: contactType,
          value: contactValue,
        });
      });
    }

    const result = await serverChangeClient(host, obj);

    console.log(result);

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
        await serverChangeClient(host, obj);

        modal.close();
        form.reset();

        form.removeEventListener('submit', handlerSubmitChange);

        renderTableClient(host, await serverGetClienstList(host));
    }
  }

  async function handleDelete() {
    await serverDeleteClient(host, obj.id);

    deleteBtn.removeEventListener('click', handleDelete);
    form.removeEventListener('submit', handlerSubmitChange);

    modal.close();
    form.reset();

    renderTableClient(host, await serverGetClienstList(host));
  }

  deleteBtn.addEventListener('click', handleDelete);

  form.addEventListener('submit', handlerSubmitChange);
}

export { getChangeClient, setChangeClient };
