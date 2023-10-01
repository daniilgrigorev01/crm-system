// Импортируем функции
import sortBy from '../../../node_modules/lodash-es/sortBy.js';
import { renderTableClient } from '../renderTableFunctions.js';

/**
 * Сортирует массив объектов по указанному свойству.
 *
 * @param {object[]} arr Массив объектов.
 * @param {string} prop Свойство объекта, по которому сортируется массив.
 * @param {boolean} dir Направление сортировки.
 * @return {object[]} Отсортированный массив объектов.
 */
const sortingList = (arr, prop, dir = false) => {
  if (dir) {
    return sortBy(arr, [prop]);
  } else {
    return sortBy(arr, [prop]).reverse();
  }
};

/**
 * Рендерит отсортированный массив клиентов.
 *
 * @param {string} host URL сервера, на котором размещено API.
 * @param {object[]} arr Массив объектов клиентов.
 */
function renderSortingList(host, arr) {
  const headerCells = document.querySelectorAll('[data-name-cell]');

  // Добавляем обработчик событий на ячейки-заголовки
  headerCells.forEach((cell) => {
    cell.addEventListener('click', () => {
      const cellIsActive = cell.classList.contains('is-active');

      // Анимируем ячейку-заголовок
      if (!cellIsActive) {
        cell.classList.add('is-active');
        headerCells.forEach((el) => {
          if (el !== cell) {
            el.classList.remove('is-active');
          }
        });
      }

      // Обновляем направление сортировки
      cell.dataset.direction = cell.dataset.direction === 'true' ? 'false' : 'true';

      // Сортируем и рендерим массив
      const sortedArr = sortingList(arr, cell.dataset.nameCell, cell.dataset.direction === 'true');
      console.log(sortedArr);
      renderTableClient(host, sortedArr);
    });
  });
}

// Экспортируем функции
export { sortingList, renderSortingList };
