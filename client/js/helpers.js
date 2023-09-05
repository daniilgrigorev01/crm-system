/**
 * Форматирует время в UNIX-формате в дату вида dd.mm.yy.
 *
 * @param {String} date - Время в UNIX-формате.
 * @returns {string} - Время в формате dd.mm.yy.
 */
function formatDate(date) {
  const formattedDate = new Date(date);

  const day = String(formattedDate.getDay()).padStart(2, '0');
  const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
  const year = String(formattedDate.getFullYear());

  return `${day}.${month}.${year}`;
}

/**
 * Форматирует время в UNIX-формате в формат вида hh:mm.
 *
 * @param {String} date - Время в UNIX-формате.
 * @returns {string} - Время в формате hh:mm.
 */
function formatTime(date) {
  const formattedDate = new Date(date);

  const hours = String(formattedDate.getUTCHours()).padStart(2, '0');
  const minutes = String(formattedDate.getUTCMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
}

/**
 *  Создаёт SVG-иконку в зависимости от типа контакта.
 *
 * @param {String} type - Тип контакта.
 * @returns {string} - HTML-код SVG-иконки.
 */
function getIconContact(type) {
  switch (type) {
    case 'Телефон':
      return `
        <svg class='table-body-cell__contact' width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm4.058 8.865c.373.364.767.707 1.102 1.109.148.178.288.362.395.568.152.295.014.618-.25.636h-1.639c-.423.035-.76-.136-1.044-.426-.226-.23-.437-.477-.655-.715a1.533 1.533 0 0 0-.295-.263c-.224-.145-.418-.1-.546.133-.13.238-.16.5-.172.765-.018.387-.135.488-.523.506-.828.038-1.614-.087-2.345-.505-.645-.368-1.143-.888-1.578-1.477C3.66 8.048 3.013 6.788 2.43 5.493c-.13-.292-.035-.448.287-.455a45.59 45.59 0 0 1 1.605 0c.218.003.362.128.445.333.29.712.644 1.388 1.088 2.016.118.167.239.334.41.452.19.13.336.087.425-.125.057-.135.082-.279.094-.423a6.317 6.317 0 0 0-.026-1.482c-.045-.308-.219-.507-.526-.565-.156-.03-.134-.088-.057-.177.132-.155.255-.25.503-.25H8.53c.291.057.357.188.396.482l.002 2.058c-.003.113.057.45.261.525.164.054.272-.077.37-.18.444-.472.76-1.028 1.044-1.604.125-.254.233-.517.338-.78.077-.194.199-.29.418-.287l1.783.002c.053 0 .106 0 .158.01.3.051.383.18.29.474-.146.46-.43.844-.708 1.229-.298.411-.616.809-.91 1.222-.272.379-.25.569.086.897Z'
            fill='#9873FF'
          />
        </svg>`;
    case 'Facebook':
      return `
        <svg class='table-body-cell__contact' width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M8 0C3.6 0 0 3.606 0 8.048c0 4.016 2.928 7.35 6.752 7.952v-5.623H4.72V8.048h2.032V6.273c0-2.016 1.192-3.124 3.024-3.124.872 0 1.784.152 1.784.152v1.984h-1.008c-.992 0-1.304.619-1.304 1.253v1.51h2.224l-.36 2.33H9.248V16a7.992 7.992 0 0 0 4.84-2.723A8.051 8.051 0 0 0 16 8.048C16 3.606 12.4 0 8 0Z' fill='#9873FF'></path>
        </svg>`;
    case 'Email':
      return `
        <svg class='table-body-cell__contact' width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path fill-rule='evenodd' clip-rule='evenodd' d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16ZM4 5.75c0-.412.36-.75.8-.75h6.4c.44 0 .8.338.8.75v4.5c0 .412-.36.75-.8.75H4.8c-.44 0-.8-.338-.8-.75v-4.5Zm4.424 2.377 2.616-1.533c.1-.06.16-.162.16-.27 0-.252-.292-.401-.52-.27L8 7.625 5.32 6.054c-.228-.131-.52.018-.52.27 0 .109.06.21.16.27l2.616 1.533c.26.154.588.154.848 0Z' fill='#9873FF'></path>
        </svg>`;
    case 'VK':
      return `
        <svg class='table-body-cell__contact' width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'>
         <path d='M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm4.058 8.865c.373.364.767.707 1.102 1.109.148.178.288.362.395.568.152.295.014.618-.25.636h-1.639c-.423.035-.76-.136-1.044-.426-.226-.23-.437-.477-.655-.715a1.533 1.533 0 0 0-.295-.263c-.224-.145-.418-.1-.546.133-.13.238-.16.5-.172.765-.018.387-.135.488-.523.506-.828.038-1.614-.087-2.345-.505-.645-.368-1.143-.888-1.578-1.477C3.66 8.048 3.013 6.788 2.43 5.493c-.13-.292-.035-.448.287-.455a45.59 45.59 0 0 1 1.605 0c.218.003.362.128.445.333.29.712.644 1.388 1.088 2.016.118.167.239.334.41.452.19.13.336.087.425-.125.057-.135.082-.279.094-.423a6.317 6.317 0 0 0-.026-1.482c-.045-.308-.219-.507-.526-.565-.156-.03-.134-.088-.057-.177.132-.155.255-.25.503-.25H8.53c.291.057.357.188.396.482l.002 2.058c-.003.113.057.45.261.525.164.054.272-.077.37-.18.444-.472.76-1.028 1.044-1.604.125-.254.233-.517.338-.78.077-.194.199-.29.418-.287l1.783.002c.053 0 .106 0 .158.01.3.051.383.18.29.474-.146.46-.43.844-.708 1.229-.298.411-.616.809-.91 1.222-.272.379-.25.569.086.897Z' fill='#9873FF'></path>
        </svg>`;
    default:
      return `
        <svg class='table-body-cell__contact' width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path fill-rule='evenodd' clip-rule='evenodd' d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16ZM3 8c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5Zm6.5-2c0-.83-.67-1.5-1.5-1.5S6.5 5.17 6.5 6 7.17 7.5 8 7.5 9.5 6.83 9.5 6ZM5 9.99a3.6 3.6 0 0 0 6 0c-.015-.995-2.005-1.54-3-1.54-1 0-2.985.545-3 1.54Z' fill='#9873FF'></path>
        </svg>`;
  }
}

function changeTypeInput(modal) {
  const selects = modal.querySelectorAll('.modal-form-contacts__input-select');
  const selectItems = modal.querySelectorAll('.modal-form-contacts-input-dropdown__item');

  selects.forEach((select) => {
    select.addEventListener('click', () => {
      const targetInput = select.nextElementSibling;

      selectItems.forEach((item) => {
        item.addEventListener('click', () => {
          const inputType = item.textContent;

          switch (inputType) {
            case 'Телефон':
              targetInput.type = 'tel';
              targetInput.name = 'phone';
              targetInput.setAttribute('aria-label', 'Телефон');
              item.setAttribute('aria-disabled', 'true');
              select.innerText = 'Телефон';

              selectItems.forEach((el) => {
                if (select.textContent !== el.textContent) {
                  el.removeAttribute('aria-disabled');
                }
              });

              break;
            case 'Email':
              targetInput.type = 'email';
              targetInput.name = 'email';
              targetInput.setAttribute('aria-label', 'Email');
              item.setAttribute('aria-disabled', 'true');
              select.innerText = 'Email';

              selectItems.forEach((el) => {
                if (select.textContent !== el.textContent) {
                  el.removeAttribute('aria-disabled');
                }
              });

              break;
            case 'Facebook':
              targetInput.type = 'text';
              targetInput.name = 'facebook';
              targetInput.setAttribute('aria-label', 'Facebook');
              item.setAttribute('aria-disabled', 'true');
              select.innerText = 'Facebook';

              selectItems.forEach((el) => {
                if (select.textContent !== el.textContent) {
                  el.removeAttribute('aria-disabled');
                }
              });

              break;
            case 'VK':
              targetInput.type = 'text';
              targetInput.name = 'vk';
              targetInput.setAttribute('aria-label', 'VK');
              item.setAttribute('aria-disabled', 'true');
              select.innerText = 'VK';

              selectItems.forEach((el) => {
                if (select.textContent !== el.textContent) {
                  el.removeAttribute('aria-disabled');
                }
              });

              break;
            default:
              targetInput.type = 'text';
              targetInput.name = 'other';
              targetInput.setAttribute('aria-label', 'Другое');
              item.setAttribute('aria-disabled', 'true');
              select.innerText = 'Другое';

              selectItems.forEach((el) => {
                if (select.textContent !== el.textContent) {
                  el.removeAttribute('aria-disabled');
                }
              });

              break;
          }
        });

        return item;
      });
    });
  });
}

function createContactInputBlock(selectText = 'Телефон', inputValue = '') {
  const input = document.createElement('input');
  const blockInput = document.createElement('div');
  const select = document.createElement('span');
  const dropdown = document.createElement('ul');
  const dropdownItemPhone = document.createElement('li');
  const dropdownItemEmail = document.createElement('li');
  const dropdownItemFb = document.createElement('li');
  const dropdownItemVk = document.createElement('li');
  const dropdownItemOther = document.createElement('li');

  blockInput.classList.add('modal-form-contacts__input-wrapper');

  select.classList.add('modal-form-contacts__input-select');
  select.innerText = selectText;

  input.classList.add('modal-form-contacts__input');
  input.type = 'tel';
  input.name = 'phone';
  input.value = inputValue;
  input.setAttribute('aria-label', selectText);
  input.placeholder = 'Введите данные контакта';

  dropdown.classList.add('ul-reset', 'modal-form-contacts__input-dropdown', 'modal-form-contacts-input-dropdown');

  dropdownItemPhone.classList.add('modal-form-contacts-input-dropdown__item');
  dropdownItemPhone.innerText = 'Телефон';
  dropdownItemPhone.setAttribute('aria-disabled', 'true');
  dropdownItemEmail.classList.add('modal-form-contacts-input-dropdown__item');
  dropdownItemEmail.innerText = 'Email';
  dropdownItemFb.classList.add('modal-form-contacts-input-dropdown__item');
  dropdownItemFb.innerText = 'Facebook';
  dropdownItemVk.classList.add('modal-form-contacts-input-dropdown__item');
  dropdownItemVk.innerText = 'VK';
  dropdownItemOther.classList.add('modal-form-contacts-input-dropdown__item');
  dropdownItemOther.innerText = 'Другое';

  dropdown.append(dropdownItemPhone, dropdownItemEmail, dropdownItemFb, dropdownItemVk, dropdownItemOther);

  blockInput.append(select, input, dropdown);

  return blockInput;
}

function setContactInput(modal) {
  const btnAddContact = modal.querySelector('.modal-form-contacts__btn-add');
  const blockContacts = modal.querySelector('.modal-form__contacts');

  btnAddContact.addEventListener('click', (event) => {
    event.preventDefault();

    blockContacts.insertBefore(createContactInputBlock(), btnAddContact);
    changeTypeInput(modal);
  });
}

// Экспортируем функции
export { formatDate, formatTime, getIconContact, setContactInput, changeTypeInput, createContactInputBlock };
