// Импортируем функции
import { formatDate, formatTime, getIconContact } from './helpers.js';
import { deleteClient } from './deleteClientFunction.js';
import { getChangeClient, setChangeClient } from './changeClientFunctions.js';

/**
 * Создаёт строку таблицы на основе данных клиента, полученных в объекте.
 *
 * @param {object} obj Объект с данными клиента.
 * @param {string} host URL сервера, на котором размещено API.
 * @returns {HTMLTableRowElement} Строка таблицы с данными клиента.
 */
function createClientRow(host, obj) {
  // Создаём строку таблицы
  const row = document.createElement('tr');
  row.classList.add('bg-white', 'h-15');

  /**
   * Создаёт ячейку таблицы с данными.
   *
   * @param {any} content Данные клиента.
   * @param {Array<string>} classes CSS-классы ячейки.
   * @returns {HTMLTableCellElement} Ячейка таблицы.
   */
  function createTableCell(content, classes = []) {
    const cell = document.createElement('td');
    cell.innerHTML = content;
    cell.classList.add(...classes);

    return cell;
  }

  row.appendChild(createTableCell(obj.id.slice(-6), ['text-txt_grey', 'pl-5', 'text-xs']));
  row.appendChild(createTableCell(`${obj.surname} ${obj.name} ${obj.lastName}`, ['pl-2.5']));

  // Создаём ячейку с датой и временем создания
  const cellCreationDate = document.createElement('td');
  const creationDateWrapper = document.createElement('div');
  const creationTime = document.createElement('span');
  creationDateWrapper.classList.add('lg:pl-2.5', 'flex', 'flex-wrap');
  creationDateWrapper.innerText = formatDate(obj.createdAt);
  creationTime.classList.add('text-txt_grey', 'lg:ml-2.5');
  creationTime.innerText = formatTime(obj.createdAt);
  creationDateWrapper.appendChild(creationTime);
  cellCreationDate.appendChild(creationDateWrapper);
  row.appendChild(cellCreationDate);

  // Создаём ячейку с датой и временем последнего изменения
  const cellLastModifiedDate = document.createElement('td');
  const lastModifiedDateWrapper = document.createElement('div');
  const lastModifiedTime = document.createElement('span');
  lastModifiedDateWrapper.classList.add('lg:pl-2.5', 'flex', 'flex-wrap');
  lastModifiedDateWrapper.innerText = formatDate(obj.updatedAt);
  lastModifiedTime.classList.add('text-txt_grey', 'lg:ml-2.5');
  lastModifiedTime.innerText = formatTime(obj.updatedAt);
  lastModifiedDateWrapper.appendChild(lastModifiedTime);
  cellLastModifiedDate.appendChild(lastModifiedDateWrapper);
  row.appendChild(cellLastModifiedDate);

  // Создаём ячейку с контактами
  const cellContacts = document.createElement('td');
  cellContacts.classList.add('grid', 'grid-cols-5', 'gap-y-1.5', 'py-2.5', 'content-center', 'h-15');

  /**
   * Создаёт иконки контактов.
   *
   * @param contact Контакты клиента.
   */
  function createContactsIcon(contact) {
    const icon = getIconContact(contact.type);
    const elementIcon = new DOMParser().parseFromString(icon, 'text/html').body.firstChild;

    const contentTooltip =
      contact.type === 'Телефон'
        ? `<span class='font-bold'>${contact.value}</span>`
        : `${contact.type}: <span class='text-[#b89eff] font-bold'>${contact.value}</span>`;

    // Добавляем всплывающие подсказки к иконкам контактов
    /* eslint-disable-next-line no-undef */
    tippy(elementIcon, {
      content: contentTooltip,
      allowHTML: true,
    });

    cellContacts.appendChild(elementIcon);
  }

  // Добавляем иконки контактов в ячейку
  obj.contacts.forEach(createContactsIcon);
  row.appendChild(cellContacts);

  // Создаём ID для SVG
  const svgId = Date.now();

  //  Создаём ячейку с кнопками
  const cellBtns = document.createElement('td');
  cellBtns.classList.add('pl-5', 'lg:columns-2');

  // Создаём кнопки и добавляем обработчики событий
  const changeBtn = document.createElement('button');
  changeBtn.classList.add('flex', 'items-center', 'hover:text-firm');
  changeBtn.innerHTML = `
    <svg class='row-btn mr-0.5 opacity-70' xmlns='http://www.w3.org/2000/svg' width='13' height='13' fill='none'>
      <path
        fill='#9873FF'
        d='M0 10.5V13h2.5l7.373-7.373-2.5-2.5L0 10.5Zm11.807-6.807c.26-.26.26-.68 0-.94l-1.56-1.56a.664.664 0 0 0-.94 0l-1.22 1.22 2.5 2.5 1.22-1.22Z'
      />
    </svg>
    <svg class='animate-spin hidden mr-0.5' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
      <g clip-path="url(#${svgId})">
        <path stroke="#9873FF" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M3 8.04a5.04 5.04 0 1 0 3.196-4.692"/>
      </g>
      <defs>
        <clipPath id="${svgId}">
          <path fill="#fff" d="M0 0h16v16H0z"/>
        </clipPath>
      </defs>
    </svg>
    Изменить`;

  changeBtn.addEventListener('click', async () => {
    changeBtn.querySelector('.animate-spin').classList.remove('hidden');
    changeBtn.querySelector('.row-btn').classList.add('hidden');

    await getChangeClient(host, obj.id);
    await setChangeClient(host, obj);

    changeBtn.querySelector('.animate-spin').classList.add('hidden');
    changeBtn.querySelector('.row-btn').classList.remove('hidden');
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('flex', 'items-center', 'hover:text-[#f06a4d]');
  deleteBtn.innerHTML = `
    <svg class='row-btn mr-0.5 opacity-70' xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none'>
      <path
        fill='#F06A4D'
        d='M6 0C2.682 0 0 2.682 0 6s2.682 6 6 6 6-2.682 6-6-2.682-6-6-6Zm0 10.8A4.806 4.806 0 0 1 1.2 6c0-2.646 2.154-4.8 4.8-4.8s4.8 2.154 4.8 4.8-2.154 4.8-4.8 4.8ZM8.154 3 6 5.154 3.846 3 3 3.846 5.154 6 3 8.154 3.846 9 6 6.846 8.154 9 9 8.154 6.846 6 9 3.846 8.154 3Z'
      />
    </svg>
    <svg class='animate-spin hidden' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
      <g clip-path="url(#${svgId + 1})">
        <path stroke="#F06A4D" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M3 8.04a5.04 5.04 0 1 0 3.196-4.692"/>
      </g>
      <defs>
        <clipPath id="${svgId + 1}">
          <path fill="#fff" d="M0 0h16v16H0z"/>
        </clipPath>
      </defs>
    </svg>
    Удалить`;

  deleteBtn.addEventListener('click', async () => {
    deleteBtn.querySelector('.animate-spin').classList.remove('hidden');
    deleteBtn.querySelector('.row-btn').classList.add('hidden');

    deleteClient(host, obj.id, row);

    deleteBtn.querySelector('.animate-spin').classList.add('hidden');
    deleteBtn.querySelector('.row-btn').classList.remove('hidden');
  });

  // Добавляем кнопки в ячейку
  cellBtns.append(changeBtn, deleteBtn);
  row.appendChild(cellBtns);

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

  // Очищаем таблицу перед рендером
  tableClient.innerHTML = '';

  // Создаём массив строк и добавляем их в таблицу
  const rows = arr.map((item) => createClientRow(host, item));
  tableClient.append(...rows);
}

// Экспортируем функции
export { renderTableClient };
