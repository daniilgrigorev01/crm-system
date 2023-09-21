/**
 * Выполняет GET-запрос к указанному серверу и возвращает список клиентов.
 *
 * @param {string} host - URL сервера, на котором размещено API.
 * @returns {Promise<any>}
 */
async function serverGetClienstList(host) {
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
 * @returns {Promise<Object>} - Объект нового клиента.
 */
async function serverAddNewClient(host, obj) {
  try {
    const response = await fetch(host + '/api/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });

    const result = await response.json();

    if (!response.ok) {
      result.errors.forEach((error) => {
        throw new Error(error.message);
      });
    }

    return result;
  } catch (error) {
    return error.message;
  }
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

/**
 * Выполняет GET-запрос к указанному серверу и получает объект клиента с совпадающим ID.
 *
 * @param {string} host - URL сервера, на котором размещено API.
 * @param {string} id - ID клиента, объект которого необходимо получить с сервера.
 * @returns {Promise<Object>} - Объект полученный с сервера.
 */
async function serverGetClient(host, id) {
  const response = await fetch(host + '/api/clients/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
}

async function serverChangeClient(host, obj) {
  const response = await fetch(host + '/api/clients/' + obj.id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return await response.json();
}

// Экспортируем функции
export { serverGetClienstList, serverAddNewClient, serverGetClient, serverDeleteClient, serverChangeClient };
