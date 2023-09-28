// eslint-disable-next-line import/no-named-default
import { default as filter } from '../../../node_modules/lodash-es/filter.js';
import { renderTableClient } from '../renderTableFunctions.js';

const filterArray = (arr, value) => {
  return filter(arr, (item) => {
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

function renderFilteredArray(host, arr) {
  const inputSearch = document.querySelector('#input-search');

  inputSearch.addEventListener('input', () => {
    setTimeout(() => {
      const filteredArray = filterArray(arr, inputSearch.value);

      renderTableClient(host, filteredArray);
    }, 300);
  });
}

export { filterArray, renderFilteredArray };
