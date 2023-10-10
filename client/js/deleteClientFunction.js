// Импортируем функции
import { serverDeleteClient } from './serverFunctions.js';
import { closeModal } from './helpers.js';

/**
 * Удаляет объект клиента с сервера по переданному ID и строку с данными из таблицы.
 *
 * @param {string} host URL сервера, на котором размещено API.
 * @param {string} id ID клиента, данные которого нужно удалить.
 * @param {HTMLTableRowElement} row Строка таблицы с данными клиента.
 */
function deleteClient(host, id, row) {
  const modal = document.getElementById('modalDeleteClient');
  const deleteBtn = modal.querySelector('.action-btn');

  modal.classList.add('is-open');
  modal.showModal();

  closeModal(modal);

  /**
   * Отправляет запрос на удаление на сервер и удаляет строку таблицы.
   */
  async function handleDelete() {
    deleteBtn.querySelector('.animate-spin').classList.remove('hidden');

    await serverDeleteClient(host, id);

    deleteBtn.querySelector('.animate-spin').classList.add('hidden');

    row.remove();
    modal.close();
    modal.classList.remove('is-open');

    deleteBtn.removeEventListener('click', handleDelete);
  }

  // Устанавливаем обработчик событий на кнопку удаления
  deleteBtn.addEventListener('click', handleDelete);
}

// Экспортируем функции
export { deleteClient };
