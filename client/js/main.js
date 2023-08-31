// Импортируем функции
import { getClientList } from './serverFunctions.js';
import { renderTableClient } from './renderTableFunctions.js';

async function initialApp() {
  const SERVER__ADDRESS = 'http://localhost:3000';

  let clientList = [];

  clientList = await getClientList(SERVER__ADDRESS);
  if (clientList.length !== 0) {
    renderTableClient(clientList);
  }
}

// Инициализируем приложение
initialApp().then((r) => {});
