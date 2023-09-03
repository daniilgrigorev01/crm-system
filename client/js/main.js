// Импортируем функции
import { serverGetClientList } from './serverFunctions.js';
import { renderTableClient } from './renderTableFunctions.js';
import { addNewClient, openModalAddClient } from './addNewClientFunctions.js';

async function initialApp() {
  const SERVER__ADDRESS = 'http://localhost:3000';
  const formAddClient = document.getElementById('formAddNewClient');

  const clientList = await serverGetClientList(SERVER__ADDRESS);

  if (clientList.length !== 0) {
    renderTableClient(SERVER__ADDRESS, clientList);
  }

  await addNewClient(SERVER__ADDRESS, formAddClient, clientList);
  openModalAddClient();
}

// Инициализируем приложение
initialApp().then((r) => {});
