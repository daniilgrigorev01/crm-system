import { sortingList } from './sortingFunction.js';

jest.mock('../../../node_modules/lodash-es/sortBy.js', () => {
  return jest.fn();
});

describe('Function sortingList:', () => {
  let arrayClients;
  let sortedIdArray;
  let sortedNameArray;
  let mockSortBy;

  beforeEach(() => {
    arrayClients = [
      {
        id: 3,
        name: 'Иван',
        surname: 'Иванов',
        age: 25,
      },
      {
        id: 1,
        name: 'Петр',
        surname: 'Петров',
        age: 30,
      },
      {
        id: 2,
        name: 'Сиджан',
        surname: 'Сиджанов',
        age: 20,
      },
    ];

    sortedIdArray = [
      {
        id: 1,
        name: 'Петр',
        surname: 'Петров',
        age: 30,
      },
      {
        id: 2,
        name: 'Сиджан',
        surname: 'Сиджанов',
        age: 20,
      },
      {
        id: 3,
        name: 'Иван',
        surname: 'Иванов',
        age: 25,
      },
    ];

    sortedNameArray = [
      {
        id: 3,
        name: 'Иван',
        surname: 'Иванов',
        age: 25,
      },
      {
        id: 1,
        name: 'Петр',
        surname: 'Петров',
        age: 30,
      },
      {
        id: 2,
        name: 'Сиджан',
        surname: 'Сиджанов',
        age: 20,
      },
    ];

    mockSortBy = require('../../../node_modules/lodash-es/sortBy.js');
  });

  test('должна вернуть отсортированный по возрастанию ID массив объектов', () => {
    mockSortBy.mockReturnValue(sortedIdArray);
    expect(sortingList(arrayClients, 'id')).toEqual(sortedIdArray.reverse());
  });

  test('должна вернуть отсортированный по убыванию ID массив объектов', () => {
    mockSortBy.mockReturnValue(sortedIdArray);
    expect(sortingList(arrayClients, 'id', true)).toEqual(sortedIdArray);
  });

  test('должна вернуть отсортированный в алфавитном порядке массив объектов', () => {
    mockSortBy.mockReturnValue(sortedNameArray);
    expect(sortingList(arrayClients, 'name')).toEqual(sortedNameArray.reverse());
  });

  test('должна вернуть отсортированный в обратном алфавитном порядке массив объектов', () => {
    mockSortBy.mockReturnValue(sortedNameArray);
    expect(sortingList(arrayClients, 'name', true)).toEqual(sortedNameArray);
  });
});
