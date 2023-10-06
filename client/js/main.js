// Импортируем функции
import { serverGetClientsList } from './serverFunctions.js';
import { addNewClient, openModalAddClient } from './addNewClientFunctions.js';
import { renderSortingList } from './sortingFunction/sortingFunction.js';
import { renderFilteredArray } from './filterFunction/filterFunction.js';
import { renderTableClient } from './renderTableFunctions.js';
import { syncChangeClient } from './changeClientFunctions.js';

/**
 * Запускает рендер таблицы и необходимые для работы функции.
 */
async function initialApp() {
  const SERVER__ADDRESS = 'http://localhost:3000';
  const formAddClient = document.getElementById('formAddNewClient');

  const clientList = await serverGetClientsList(SERVER__ADDRESS);

  if (clientList.length !== 0) {
    renderTableClient(SERVER__ADDRESS, clientList);
  }

  await addNewClient(SERVER__ADDRESS, formAddClient, clientList);

  renderSortingList(SERVER__ADDRESS, clientList);
  renderFilteredArray(SERVER__ADDRESS, clientList);

  openModalAddClient();
  syncChangeClient(SERVER__ADDRESS);
}

// Инициализируем приложение
initialApp().then((r) => {});
