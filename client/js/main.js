// Импортируем функции
import { serverGetClientList } from './serverFunctions.js';
import { renderTableClient } from './renderTableFunctions.js';

async function initialApp() {
  const SERVER__ADDRESS = 'http://localhost:3000';

  const clientList = await serverGetClientList(SERVER__ADDRESS);

  if (clientList.length !== 0) {
    renderTableClient(SERVER__ADDRESS, clientList);
  }
}

// Инициализируем приложение
initialApp().then((r) => {});
