import { sortingList } from './sortingFunction.js';

describe('sortingFunction:', () => {
  let arrayClients;
  let sortedIdArray;
  let sortedNameArray;

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
  });

  test('должна вернуть отсортированный по возрастанию ID массив объектов', () => {
    expect(sortingList(arrayClients, 'id')).toEqual(sortedIdArray);
  });
  test('должна вернуть отсортированный по убыванию ID массив объектов', () => {
    expect(sortingList(arrayClients, 'id', true)).toEqual(sortedIdArray.reverse());
  });
  test('должна вернуть отсортированный в алфавитном порядке массив объектов', () => {
    expect(sortingList(arrayClients, 'name')).toEqual(sortedNameArray);
  });
  test('должна вернуть отсортированный в обратном алфавитном порядке массив объектов', () => {
    expect(sortingList(arrayClients, 'name', true)).toEqual(sortedNameArray.reverse());
  });
});
