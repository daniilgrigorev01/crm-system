// Импортируем функции
import { serverDeleteClient } from './serverFunctions.js';

/**
 * Удаляет объект клиента с сервера по переданному ID и строку с данными из таблицы.
 *
 * @param {string} host - URL сервера, на котором размещено API.
 * @param {string} id - ID клиента, данные которого нужно удалить.
 * @param {HTMLTableRowElement} row - Строка таблицы с данными клиента.
 */
function deleteClient(host, id, row) {
  const modal = document.getElementById('modalDelete');
  const deleteBtn = document.getElementById('deleteClientBtn');

  modal.showModal();

  deleteBtn.addEventListener('click', async () => {
    await serverDeleteClient(host, id);

    row.remove();

    modal.close();
  });
}

// Экспортируем функции
export { deleteClient };
