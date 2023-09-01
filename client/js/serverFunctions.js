/**
 * Выполняет GET-запрос к указанному серверу и возвращает список клиентов.
 *
 * @param {string} host - URL сервера, на котором размещено API.
 * @returns {Promise<any>}
 */
async function serverGetClientList(host) {
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
async function serverAddNewClient(host, obj) {
  const response = await fetch(host + '/api/clients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return await response.json();
}

/**
 * Выполняет запрос к указанному серверу и удаляет объект клиента с совпадающим ID.
 *
 * @param {string} host - URL сервера, на котором размещено API.
 * @param {string} id - ID клиента, объект которого необходимо удалить с сервера.
 * @returns {Promise<any>}
 */
async function serverDeleteClient(host, id) {
  const response = await fetch(host + '/api/clients/' + id, {
    method: 'DELETE',
  });

  return await response.json();
}

// Экспортируем функции
export { serverGetClientList, serverAddNewClient, serverDeleteClient };
