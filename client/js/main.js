// Импортируем функции
import { serverGetClientsList } from './serverFunctions.js';
import { renderTableClient } from './renderTableFunctions.js';
import { addNewClient, openModalAddClient } from './addNewClientFunctions.js';
import { renderSortingList } from './sortingFunction/sortingFunction.js';

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

  openModalAddClient();
}

// Инициализируем приложение
initialApp().then((r) => {});
