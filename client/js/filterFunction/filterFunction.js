// Импортируем функции

/**
 * Фильтрует массив клиентов по фамилии, имени и отчеству.
 *
 * @param {object[]} arr  Массив, который необходимо отфильтровать.
 * @param {string} value Значение, по которому фильтруется массив.
 * @return {object[]} Отфильтрованный массив.
 */
const filterArray = (arr, value) => {
  return arr.filter((item) => {
    const splitValue = value.split(' ');

    if (splitValue[2]) {
      return (
        item.surname.toLowerCase().includes(splitValue[0].toLowerCase()) &&
        item.name.toLowerCase().includes(splitValue[1].toLowerCase()) &&
        item.lastName.toLowerCase().includes(splitValue[2].toLowerCase())
      );
    } else if (splitValue[1]) {
      return (
        item.surname.toLowerCase().includes(splitValue[0].toLowerCase()) &&
        item.name.toLowerCase().includes(splitValue[1].toLowerCase())
      );
    } else {
      return item.surname.toLowerCase().includes(splitValue[0].toLowerCase());
    }
  });
};

/**
 * Создаёт отсортированный по имени и фамилии список клиентов.
 *
 * @param {object[]} arr Массив клиентов, который необходимо отсортировать.
 * @return {HTMLUListElement} Отсортированный список клиентов.
 */
function createFilteredListItem(arr) {
  const blockFilteredList = document.querySelector('.filtered-list');
  const filteredList = document.createElement('ul');

  for (const item of arr) {
    const listItem = document.createElement('li');
    const elementName = document.createElement('a');
    const elementId = document.createElement('span');

    listItem.classList.add('text-base');
    elementName.classList.add('px-4', 'py-3', 'flex', 'justify-between', 'w-full');
    elementId.classList.add('text-txt_grey');

    elementName.textContent = `${item.name} ${item.surname}`;
    elementName.href = `#${item.id}`;
    elementId.textContent = item.id.slice(-6);

    listItem.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        const nextElem = elementName.parentElement.nextElementSibling.firstChild;
        nextElem.focus();
      } else if (e.key === 'ArrowUp') {
        const prevElem = elementName.parentElement.previousElementSibling.firstChild;
        prevElem.focus();
      } else if (e.key === 'Enter') {
        elementName.click();
        blockFilteredList.classList.remove('md:block');
      }
    });

    elementName.addEventListener('click', (event) => {
      event.preventDefault();

      const targetElement = document.getElementById(item.id);

      blockFilteredList.classList.remove('md:block');

      targetElement.scrollIntoView({ behavior: 'smooth' });
      targetElement.focus();
    });

    elementName.append(elementId);
    listItem.append(elementName);
    filteredList.append(listItem);
  }

  return filteredList;
}

/**
 * Рендерит отсортированный список клиентов при вводе значения в поле поиска.
 *
 * @param {string} host URL сервера, на котором размещено API.
 * @param {object[]} arr Массив клиентов, который необходимо отсортировать.
 */
function renderFilteredArray(host, arr) {
  const inputSearch = document.querySelector('#input-search');
  const blockFilteredList = document.querySelector('.filtered-list');

  // Добавляем обработчик событий на поле поиска
  inputSearch.addEventListener('input', () => {
    if (inputSearch.value !== '') {
      setTimeout(() => {
        const filteredArray = filterArray(arr, inputSearch.value);

        blockFilteredList.innerHTML = '';
        blockFilteredList.append(createFilteredListItem(filteredArray));
        blockFilteredList.classList.add('md:block');
      }, 300);
    } else {
      blockFilteredList.innerHTML = '';
      blockFilteredList.classList.remove('md:block');
    }
  });
}

// Экспортируем функции
export { filterArray, renderFilteredArray };
