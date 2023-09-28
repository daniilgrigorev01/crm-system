// eslint-disable-next-line import/no-named-default
import { default as sortBy } from '../../../node_modules/lodash-es/sortBy.js';
import { renderTableClient } from '../renderTableFunctions.js';

const sortingList = (arr, prop, dir = false) => {
  if (dir) {
    return sortBy(arr, [prop]).reverse();
  } else {
    return sortBy(arr, [prop]);
  }
};

function renderSortingList(host, arr) {
  const headerCells = document.querySelectorAll('[data-name-cell]');

  headerCells.forEach((cell) => {
    cell.addEventListener('click', () => {
      const cellIsActive = cell.classList.contains('is-active');

      if (!cellIsActive) {
        cell.classList.add('is-active');
        headerCells.forEach((el) => {
          if (el !== cell) {
            el.classList.remove('is-active');
          }
        });
      }

      if (cell.dataset.direction === 'true') {
        cell.dataset.direction = 'false';

        renderTableClient(host, sortingList(arr, cell.dataset.nameCell, true));
      } else {
        cell.dataset.direction = 'true';

        renderTableClient(host, sortingList(arr, cell.dataset.nameCell));
      }
    });
  });
}

export { sortingList, renderSortingList };
