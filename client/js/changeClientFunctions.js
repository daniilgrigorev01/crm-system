import { serverChangeClient, serverGetClienstList, serverGetClient } from './serverFunctions.js';
import { createContactInputBlock, setContactInput } from './helpers.js';
import { renderTableClient } from './renderTableFunctions.js';

async function openModalChangeClient(host, id) {
  const modal = document.getElementById('modalChangeClient');

  modal.showModal();

  setContactInput(modal);

  return await serverGetClient(host, id);
}

async function getChangeClient(host, id) {
  const modal = document.getElementById('modalChangeClient');
  const blockContacts = modal.querySelector('.modal-form__contacts');
  const btnAddContact = modal.querySelector('.modal-form-contacts__btn-add');

  const idClient = modal.querySelector('.modal__id');
  const inputName = document.getElementById('inputChangeName');
  const inputSurname = document.getElementById('inputChangeSurname');
  const inputPatronymic = document.getElementById('inputChangePatronymic');

  const client = await openModalChangeClient(host, id);

  idClient.innerText = client.id.slice(-6);
  inputName.value = client.name;
  inputSurname.value = client.surname;
  inputPatronymic.value = client.lastName;

  const contactsList = client.contacts;

  if (contactsList !== 0) {
    for (const contact of contactsList) {
      const contactType = contact.type;
      const contactValue = contact.value;

      blockContacts.insertBefore(createContactInputBlock(contactType, contactValue), btnAddContact);
    }
  }
}

function setChangeClient(host, obj) {
  const form = document.getElementById('formChangeClient');
  const inputName = document.getElementById('inputChangeName');
  const inputSurname = document.getElementById('inputChangeSurname');
  const inputPatronymic = document.getElementById('inputChangePatronymic');
  const modal = document.getElementById('modalChangeClient');

  obj.name = inputName.value.trim();
  obj.surname = inputSurname.value.trim();
  obj.lastName = inputPatronymic.value.trim();

  obj.contacts = [];

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const contactsInput = form.querySelector('.modal-form__contacts').querySelectorAll('.modal-form-contacts__input');

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

    await serverChangeClient(host, obj);

    modal.close();

    renderTableClient(host, await serverGetClienstList(host));
  });
}

export { getChangeClient, setChangeClient };
