/**
 * @jest-environment jsdom
 */

import { filterArray } from './filterFunction.js';

describe('Function filterArray:', () => {
  let array;
  let filteredSurnameArray;
  let filteredNameAndSurnameArray;
  let filteredNameAndSurnameAndPatronymicArray;

  beforeEach(() => {
    array = [
      { name: 'John', surname: 'Smith', lastName: 'Johnson' },
      { name: 'Jane', surname: 'Smith', lastName: 'Johnson' },
      { name: 'John', surname: 'Doe', lastName: '' },
      { name: 'Jane', surname: 'Doe', lastName: 'Johnson' },
      { name: 'John', surname: 'Doe', lastName: 'Smith' },
    ];

    filteredSurnameArray = [
      { name: 'John', surname: 'Doe', lastName: '' },
      { name: 'Jane', surname: 'Doe', lastName: 'Johnson' },
      { name: 'John', surname: 'Doe', lastName: 'Smith' },
    ];

    filteredNameAndSurnameArray = [
      { name: 'John', surname: 'Doe', lastName: '' },
      { name: 'John', surname: 'Doe', lastName: 'Smith' },
    ];

    filteredNameAndSurnameAndPatronymicArray = [{ name: 'John', surname: 'Doe', lastName: 'Smith' }];
  });

  test('должна вернуть массив объектов отфильтрованный только по фамилии', () => {
    expect(filterArray(array, 'Doe')).toEqual(filteredSurnameArray);
    expect(filterArray(array, 'doe')).toEqual(filteredSurnameArray);
  });

  test('должна вернуть массив объектов отфильтрованный только по имени и фамилии', () => {
    expect(filterArray(array, 'Doe John')).toEqual(filteredNameAndSurnameArray);
    expect(filterArray(array, 'doe john')).toEqual(filteredNameAndSurnameArray);
  });

  test('должна вернуть массив объектов отфильтрованный по имени, фамилии и отчеству', () => {
    expect(filterArray(array, 'Doe John Smith')).toEqual(filteredNameAndSurnameAndPatronymicArray);
    expect(filterArray(array, 'doe john smith')).toEqual(filteredNameAndSurnameAndPatronymicArray);
  });

  test('должна вернуть пустой массив', () => {
    expect(filterArray(array, 'Alex')).toEqual([]);
  });
});
