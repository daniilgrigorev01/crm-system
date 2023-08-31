/**
 * Выполняет GET-запрос к указанному серверу и возвращает список клиентов.
 *
 * @param {string} host - URL сервера, на котором размещено API.
 * @returns {Promise<any>} - Массив объектов.
 */
async function getClientList(host) {
  const response = await fetch(host + '/api/clients', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
}

/**
 * Выполняет POST-запрос к указанному серверу и добавляет нового клиента.
 *
 * @param {string} host - URL сервера, на котором размещено API.
 * @param {object} obj - Объект с данными нового клиента.
 * @returns {Promise<object>} - Объект нового клиента.
 */
async function addNewClient(host, obj) {
  const response = await fetch(host + '/api/clients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return await response.json();
}

// Экспортируем функции
export { getClientList, addNewClient };
