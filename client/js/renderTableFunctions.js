// Импортируем функции
import { formatDate, formatTime, getIconContact } from './helpers.js';

/**
 * Создаёт строку таблицы на основе данных клиента, полученных в объекте.
 *
 * @param {object} obj - Объект с данными клиента.
 * @returns {HTMLTableRowElement} - Строка таблицы с данными клиента.
 */
function createClientRow(obj) {
  const row = document.createElement('tr');
  const cellId = document.createElement('td');
  const cellName = document.createElement('td');
  const cellCreationDate = document.createElement('td');
  const cellLastModifiedDate = document.createElement('td');
  const cellContacts = document.createElement('td');
  const cellBtns = document.createElement('td');

  const cellCreationTime = document.createElement('span');
  const cellLastModifiedTime = document.createElement('span');

  const changeBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');

  row.classList.add('table-body__row');

  cellId.classList.add('table-body__cell', 'table-body-cell');
  cellId.innerText = obj.id.slice(-6);

  cellName.classList.add('table-body__cell', 'table-body-cell');
  cellName.innerText = `${obj.surname} ${obj.name} ${obj.lastName}`;

  cellCreationDate.classList.add('table-body__cell', 'table-body-cell');
  cellCreationDate.innerText = formatDate(obj.createdAt);
  cellCreationTime.classList.add('table-body-cell__time');
  cellCreationTime.innerText = formatTime(obj.createdAt);
  cellCreationDate.append(cellCreationTime);

  cellLastModifiedDate.classList.add('table-body__cell', 'table-body-cell');
  cellLastModifiedDate.innerText = formatDate(obj.updatedAt);
  cellLastModifiedTime.classList.add('table-body-cell__time');
  cellLastModifiedTime.innerText = formatTime(obj.updatedAt);
  cellLastModifiedDate.append(cellLastModifiedTime);

  cellContacts.classList.add('table-body__cell', 'table-body-cell');

  obj.contacts.forEach((contact) => {
    const icon = getIconContact(contact.type);
    const contactWrapper = document.createElement('div');

    contactWrapper.innerHTML = `${icon}`;

    cellContacts.append(contactWrapper);
  });

  cellBtns.classList.add('table-body__cell', 'table-body-cell');
  changeBtn.classList.add('btn-reset', 'table-body-cell__btn', 'table-body-cell-btn');
  changeBtn.innerHTML = `
    <svg class='table-body-cell-btn__icon' width='13' height='13' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M0 10.5V13h2.5l7.373-7.373-2.5-2.5L0 10.5Zm11.807-6.806c.26-.26.26-.68 0-.94l-1.56-1.56a.664.664 0 0 0-.94 0l-1.22 1.22 2.5 2.5 1.22-1.22Z'
        fill='#9873FF'
      />
    </svg>
    Изменить`;
  deleteBtn.classList.add('btn-reset', 'table-body-cell__btn', 'table-body-cell-btn');
  deleteBtn.innerHTML = `
    <svg class='table-body-cell-btn__icon' width='12' height='12' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M6 0C2.682 0 0 2.682 0 6s2.682 6 6 6 6-2.682 6-6-2.682-6-6-6Zm0 10.8A4.806 4.806 0 0 1 1.2 6c0-2.646 2.154-4.8 4.8-4.8s4.8 2.154 4.8 4.8-2.154 4.8-4.8 4.8ZM8.154 3 6 5.154 3.846 3 3 3.846 5.154 6 3 8.154 3.846 9 6 6.846 8.154 9 9 8.154 6.846 6 9 3.846 8.154 3Z'
        fill='#F06A4D'
      />
    </svg>
    Удалить`;
  cellBtns.append(changeBtn, deleteBtn);

  row.append(cellId, cellName, cellCreationDate, cellLastModifiedDate, cellContacts, cellBtns);

  return row;
}

/**
 * Создаёт таблицу клиентов на основе массива объектов с данными.
 *
 * @param {Array<object>} arr - Массив объектов.
 */
function renderTableClient(arr) {
  const tableClient = document.getElementById('tableClients');

  tableClient.innerHTML = '';

  for (const item of arr) {
    const rowClient = createClientRow(item);

    tableClient.append(rowClient);
  }
}

// Экспортируем функции
export { renderTableClient };
