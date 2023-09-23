// Импортируем функции
import { formatDate, formatTime, getIconContact } from './helpers.js';
import { deleteClient } from './deleteClientFunction.js';
import { getChangeClient, setChangeClient } from './changeClientFunctions.js';

/**
 * Создаёт строку таблицы на основе данных клиента, полученных в объекте.
 *
 * @param {object} obj - Объект с данными клиента.
 * @param {string} host - URL сервера, на котором размещено API.
 * @returns {HTMLTableRowElement} - Строка таблицы с данными клиента.
 */
function createClientRow(host, obj) {
  const row = document.createElement('tr');
  const cellId = document.createElement('td');
  const cellName = document.createElement('td');
  const cellCreationDate = document.createElement('td');
  const cellLastModifiedDate = document.createElement('td');
  const cellContacts = document.createElement('td');
  const cellBtns = document.createElement('td');

  const creationDateWrapper = document.createElement('div');
  const lastModifiedDate = document.createElement('div');

  const cellCreationTime = document.createElement('span');
  const cellLastModifiedTime = document.createElement('span');

  const changeBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');

  row.classList.add('bg-white', 'h-15');

  cellId.classList.add('text-txt_grey', 'pl-5', 'text-xs');
  cellId.innerText = obj.id.slice(-6);

  cellName.classList.add('pl-2.5');
  cellName.innerText = `${obj.surname} ${obj.name} ${obj.lastName}`;

  creationDateWrapper.classList.add('lg:pl-2.5', 'flex', 'flex-wrap');
  creationDateWrapper.innerText = formatDate(obj.createdAt);
  cellCreationTime.classList.add('text-txt_grey', 'lg:ml-2.5');
  cellCreationTime.innerText = formatTime(obj.createdAt);
  creationDateWrapper.append(cellCreationTime);
  cellCreationDate.append(creationDateWrapper);

  lastModifiedDate.classList.add('lg:pl-2.5', 'flex', 'flex-wrap');
  lastModifiedDate.innerText = formatDate(obj.updatedAt);
  cellLastModifiedTime.classList.add('text-txt_grey', 'lg:ml-2.5');
  cellLastModifiedTime.innerText = formatTime(obj.updatedAt);
  lastModifiedDate.append(cellLastModifiedTime);
  cellLastModifiedDate.append(lastModifiedDate);

  cellContacts.classList.add('grid', 'grid-cols-5', 'gap-y-1.5', 'py-2.5', 'content-center', 'h-15');

  obj.contacts.forEach((contact) => {
    const icon = getIconContact(contact.type);
    const elementIcon = new DOMParser().parseFromString(icon, 'text/html').body.firstChild;
    let contentTooltip = '';

    cellContacts.append(elementIcon);

    if (contact.type === 'Телефон') {
      contentTooltip = `<span class='font-bold'>${contact.value}</span>`;

      /* eslint-disable no-undef */
      tippy(elementIcon, {
        content: contentTooltip,
        allowHTML: true,
      });
    } else {
      contentTooltip = `${contact.type}: <span class='text-[#b89eff] font-bold'>${contact.value}</span>`;

      tippy(elementIcon, {
        content: contentTooltip,
        allowHTML: true,
      });
      /* eslint-enable no-undef */
    }
  });

  cellBtns.classList.add('pl-5', 'lg:columns-2');
  changeBtn.classList.add('flex', 'items-center');
  changeBtn.innerHTML = `
    <svg class='mr-0.5 opacity-70' xmlns='http://www.w3.org/2000/svg' width='13' height='13' fill='none'>
      <path
        fill='#9873FF'
        d='M0 10.5V13h2.5l7.373-7.373-2.5-2.5L0 10.5Zm11.807-6.807c.26-.26.26-.68 0-.94l-1.56-1.56a.664.664 0 0 0-.94 0l-1.22 1.22 2.5 2.5 1.22-1.22Z'
      />
    </svg>
    Изменить`;
  deleteBtn.classList.add('flex', 'items-center');
  deleteBtn.innerHTML = `
    <svg class='mr-0.5 opacity-70' xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none'>
      <path
        fill='#F06A4D'
        d='M6 0C2.682 0 0 2.682 0 6s2.682 6 6 6 6-2.682 6-6-2.682-6-6-6Zm0 10.8A4.806 4.806 0 0 1 1.2 6c0-2.646 2.154-4.8 4.8-4.8s4.8 2.154 4.8 4.8-2.154 4.8-4.8 4.8ZM8.154 3 6 5.154 3.846 3 3 3.846 5.154 6 3 8.154 3.846 9 6 6.846 8.154 9 9 8.154 6.846 6 9 3.846 8.154 3Z'
      />
    </svg>
    Удалить`;
  cellBtns.append(changeBtn, deleteBtn);

  row.append(cellId, cellName, cellCreationDate, cellLastModifiedDate, cellContacts, cellBtns);

  changeBtn.addEventListener('click', async () => {
    await getChangeClient(host, obj.id);
    await setChangeClient(host, obj);
  });

  deleteBtn.addEventListener('click', () => {
    deleteClient(host, obj.id, row);
  });

  return row;
}

/**
 * Создаёт таблицу клиентов на основе массива объектов с данными.
 *
 * @param {Array<object>} arr - Массив объектов.
 * @param {string} host - URL сервера, на котором размещено API.
 */
function renderTableClient(host, arr) {
  const tableClient = document.getElementById('tableClients');

  tableClient.innerHTML = '';

  for (const item of arr) {
    const rowClient = createClientRow(host, item);

    tableClient.append(rowClient);
  }
}

// Экспортируем функции
export { renderTableClient };
