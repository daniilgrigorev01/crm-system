import Inputmask from '../libs/inputmask.es6.js';

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
        <svg class='opacity-70' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
          <g>
            <circle cx="8" cy="8" r="8" fill="#9873FF"/>
            <path fill="#fff" d="M11.56 9.502a5.085 5.085 0 0 1-1.569-.249.434.434 0 0 0-.449.107l-.698.876C7.587 9.636 6.41 8.502 5.782 7.2l.867-.738a.454.454 0 0 0 .107-.453 4.957 4.957 0 0 1-.25-1.569c0-.24-.2-.44-.44-.44H4.53C4.289 4 4 4.107 4 4.44 4 8.569 7.436 12 11.56 12c.316 0 .44-.28.44-.524V9.942c0-.24-.2-.44-.44-.44Z"/>
          </g>
        </svg>`;
    case 'Facebook':
      return `
        <svg class='opacity-70' width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M8 0C3.6 0 0 3.606 0 8.048c0 4.016 2.928 7.35 6.752 7.952v-5.623H4.72V8.048h2.032V6.273c0-2.016 1.192-3.124 3.024-3.124.872 0 1.784.152 1.784.152v1.984h-1.008c-.992 0-1.304.619-1.304 1.253v1.51h2.224l-.36 2.33H9.248V16a7.992 7.992 0 0 0 4.84-2.723A8.051 8.051 0 0 0 16 8.048C16 3.606 12.4 0 8 0Z' fill='#9873FF'></path>
        </svg>`;
    case 'Email':
      return `
        <svg class='opacity-70' width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path fill-rule='evenodd' clip-rule='evenodd' d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16ZM4 5.75c0-.412.36-.75.8-.75h6.4c.44 0 .8.338.8.75v4.5c0 .412-.36.75-.8.75H4.8c-.44 0-.8-.338-.8-.75v-4.5Zm4.424 2.377 2.616-1.533c.1-.06.16-.162.16-.27 0-.252-.292-.401-.52-.27L8 7.625 5.32 6.054c-.228-.131-.52.018-.52.27 0 .109.06.21.16.27l2.616 1.533c.26.154.588.154.848 0Z' fill='#9873FF'></path>
        </svg>`;
    case 'VK':
      return `
        <svg class='opacity-70' width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'>
         <path d='M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm4.058 8.865c.373.364.767.707 1.102 1.109.148.178.288.362.395.568.152.295.014.618-.25.636h-1.639c-.423.035-.76-.136-1.044-.426-.226-.23-.437-.477-.655-.715a1.533 1.533 0 0 0-.295-.263c-.224-.145-.418-.1-.546.133-.13.238-.16.5-.172.765-.018.387-.135.488-.523.506-.828.038-1.614-.087-2.345-.505-.645-.368-1.143-.888-1.578-1.477C3.66 8.048 3.013 6.788 2.43 5.493c-.13-.292-.035-.448.287-.455a45.59 45.59 0 0 1 1.605 0c.218.003.362.128.445.333.29.712.644 1.388 1.088 2.016.118.167.239.334.41.452.19.13.336.087.425-.125.057-.135.082-.279.094-.423a6.317 6.317 0 0 0-.026-1.482c-.045-.308-.219-.507-.526-.565-.156-.03-.134-.088-.057-.177.132-.155.255-.25.503-.25H8.53c.291.057.357.188.396.482l.002 2.058c-.003.113.057.45.261.525.164.054.272-.077.37-.18.444-.472.76-1.028 1.044-1.604.125-.254.233-.517.338-.78.077-.194.199-.29.418-.287l1.783.002c.053 0 .106 0 .158.01.3.051.383.18.29.474-.146.46-.43.844-.708 1.229-.298.411-.616.809-.91 1.222-.272.379-.25.569.086.897Z' fill='#9873FF'></path>
        </svg>`;
    default:
      return `
        <svg class='opacity-70' width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path fill-rule='evenodd' clip-rule='evenodd' d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16ZM3 8c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5Zm6.5-2c0-.83-.67-1.5-1.5-1.5S6.5 5.17 6.5 6 7.17 7.5 8 7.5 9.5 6.83 9.5 6ZM5 9.99a3.6 3.6 0 0 0 6 0c-.015-.995-2.005-1.54-3-1.54-1 0-2.985.545-3 1.54Z' fill='#9873FF'></path>
        </svg>`;
  }
}

function changeTypeInput(select) {
  function handlerSelect() {
    const targetInput = select.nextElementSibling;
    const dropdown = select.querySelector('.dropdown');
    const selectIcon = select.querySelector('.select-icon');
    const dropdownItems = dropdown.querySelectorAll('.dropdown-item');
    const selectValue = select.querySelector('.select-text');

    dropdown.classList.toggle('scale-y-0');
    selectIcon.classList.toggle('rotate-180');

    dropdownItems.forEach((item) => {
      item.addEventListener('click', () => {
        const inputType = item.textContent;

        switch (inputType) {
          case 'Телефон':
            targetInput.type = 'tel';
            targetInput.name = 'phone';
            targetInput.value = '';
            targetInput.setAttribute('aria-label', 'Телефон');
            selectValue.textContent = 'Телефон';
            if (!targetInput.inputmask) {
              Inputmask('+7 (999) 999-99-99').mask(targetInput);
            }

            break;
          case 'Email':
            targetInput.type = 'email';
            targetInput.name = 'email';
            targetInput.value = '';
            targetInput.setAttribute('aria-label', 'Email');
            selectValue.textContent = 'Email';
            if (targetInput.inputmask) {
              targetInput.inputmask.remove();
            }

            break;
          case 'Facebook':
            targetInput.type = 'text';
            targetInput.name = 'facebook';
            targetInput.value = '';
            targetInput.setAttribute('aria-label', 'Facebook');
            selectValue.textContent = 'Facebook';
            if (targetInput.inputmask) {
              targetInput.inputmask.remove();
            }

            break;
          case 'VK':
            targetInput.type = 'text';
            targetInput.name = 'vk';
            targetInput.value = '';
            targetInput.setAttribute('aria-label', 'VK');
            selectValue.textContent = 'VK';
            if (targetInput.inputmask) {
              targetInput.inputmask.remove();
            }

            break;
          default:
            targetInput.type = 'text';
            targetInput.name = 'other';
            targetInput.value = '';
            targetInput.setAttribute('aria-label', 'Другое');
            selectValue.textContent = 'Другое';
            if (targetInput.inputmask) {
              targetInput.inputmask.remove();
            }

            break;
        }
      });

      return item;
    });
  }

  select.addEventListener('click', handlerSelect);
}

function createContactInputBlock(selectText = 'Телефон', inputValue = '') {
  const blockInput = document.createElement('div');
  const select = document.createElement('div');
  const selectValue = document.createElement('div');
  const selectValueInner = document.createElement('span');
  const selectIcon = document.createElement('span');
  const dropdown = document.createElement('ul');
  const dropdownItemPhone = document.createElement('li');
  const dropdownItemEmail = document.createElement('li');
  const dropdownItemFb = document.createElement('li');
  const dropdownItemVk = document.createElement('li');
  const dropdownItemOther = document.createElement('li');
  const input = document.createElement('input');
  const cancelBtn = document.createElement('button');
  const svgId = new Date().getTime();

  blockInput.classList.add('relative', 'mb-3.5', 'flex', 'last-of-type:mb-6', 'first:mt-4', 'input-contact');

  select.classList.add(
    'form-select',
    'w-40',
    'border-grey',
    'bg-[#e7e5eb]',
    'bg-none',
    'relative',
    'text-xs',
    'flex',
    'items-center'
  );
  selectValueInner.classList.add('select-text');
  selectValueInner.textContent = selectText;
  selectIcon.classList.add(
    'select-icon',
    'block',
    'absolute',
    'top-[13px]',
    'right-2',
    'transition-transform',
    'duration-200',
    'easy-linear'
  );
  selectIcon.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none"> <path fill="#9873FF" d="M1.495 3.69a.625.625 0 0 0 0 .885L5.65 8.73c.195.195.51.195.705 0l4.155-4.155a.625.625 0 1 0-.885-.885L6 7.31 2.375 3.685a.623.623 0 0 0-.88.005Z"/> </svg>';
  selectValue.append(selectValueInner, selectIcon);
  select.append(selectValue);

  dropdown.classList.add(
    'dropdown',
    'absolute',
    'top-[35px]',
    '-left-px',
    '-right-[0.05rem]',
    'bg-[#f4f3f6]',
    'border',
    'border-grey',
    'py-2.5',
    'pl-3',
    'origin-top',
    'scale-y-0',
    'transition-transform',
    'duration-300',
    'easy-in-out',
    'z-10'
  );
  dropdownItemPhone.classList.add('mb-2.5', 'last:mb-0', 'dropdown-item');
  dropdownItemPhone.textContent = 'Телефон';
  dropdownItemEmail.classList.add('mb-2.5', 'last:mb-0', 'dropdown-item');
  dropdownItemEmail.textContent = 'Email';
  dropdownItemFb.classList.add('mb-2.5', 'last:mb-0', 'dropdown-item');
  dropdownItemFb.textContent = 'Facebook';
  dropdownItemVk.classList.add('mb-2.5', 'last:mb-0', 'dropdown-item');
  dropdownItemVk.textContent = 'VK';
  dropdownItemOther.classList.add('mb-2.5', 'last:mb-0', 'dropdown-item');
  dropdownItemOther.textContent = 'Другое';

  dropdown.append(dropdownItemPhone, dropdownItemEmail, dropdownItemFb, dropdownItemVk, dropdownItemOther);

  input.classList.add(
    'modal-contacts-input',
    'w-full',
    'border-l-0',
    'border-r-grey',
    'border-y-grey',
    'bg-transparent',
    'py-2',
    'pl-1.5',
    'pr-8',
    'text-sm',
    'placeholder:text-txt_grey'
  );

  switch (selectText) {
    case 'Телефон':
      input.type = 'tel';
      input.name = 'phone';
      Inputmask('+7 (999) 999-99-99').mask(input);
      break;
    case 'Email':
      input.type = 'email';
      input.name = 'email';
      break;
    case 'Facebook':
      input.type = 'url';
      input.name = 'facebook';
      break;
    case 'VK':
      input.type = 'url';
      input.name = 'vk';
      break;
    case 'Другое':
      input.type = 'text';
      input.name = 'other';
      break;
  }

  input.value = inputValue;
  input.setAttribute('aria-label', selectText);
  input.dataset.completed = 'false';
  input.placeholder = 'Введите данные контакта';

  cancelBtn.classList.add(
    'absolute',
    'right-0',
    'flex',
    'h-full',
    'w-7',
    'items-center',
    'justify-center',
    'border',
    'border-grey',
    'bg-[#e7e5eb]',
    'invisible'
  );
  cancelBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"> <g clip-path="url(#${svgId})"> <path d="M8 2C4.682 2 2 4.682 2 8s2.682 6 6 6 6-2.682 6-6-2.682-6-6-6Zm0 10.8A4.806 4.806 0 0 1 3.2 8c0-2.646 2.154-4.8 4.8-4.8s4.8 2.154 4.8 4.8-2.154 4.8-4.8 4.8ZM10.154 5 8 7.154 5.846 5 5 5.846 7.154 8 5 10.154l.846.846L8 8.846 10.154 11l.846-.846L8.846 8 11 5.846 10.154 5Z" fill="#B0B0B0" /> </g> <defs> <clipPath id="${svgId}"> <path fill="#fff" d="M0 0h16v16H0z" /> </clipPath> </defs> </svg>`;

  cancelBtn.addEventListener('click', () => {
    blockInput.remove();
  });

  select.append(dropdown);
  blockInput.append(select, input, cancelBtn);

  input.addEventListener('input', () => {
    setTimeout(() => {
      if (input.value) {
        cancelBtn.classList.remove('invisible');
      } else {
        cancelBtn.classList.add('invisible');
      }
    }, 300);
  });

  return blockInput;
}

function handlerAddContact(event) {
  event.preventDefault();

  const modal = event.target.closest('.dialog');
  const blockContacts = modal.querySelector('.modal-block-contacts__wrapper');
  const btnAddContact = modal.querySelector('.modal-btn-add-contact');
  const selectContact = createContactInputBlock();

  let countInput = blockContacts.querySelectorAll('.form-select').length;

  if (countInput < 10) {
    countInput++;

    blockContacts.append(selectContact);

    changeTypeInput(selectContact.querySelector('.form-select'));

    if (countInput === 10) {
      btnAddContact.classList.add('visually-hidden');
    }
  }
}

function setContactInput(modal) {
  const btnAddContact = modal.querySelector('.modal-btn-add-contact');

  btnAddContact.addEventListener('click', handlerAddContact);
}

function closeModal(modal) {
  const cancelBtn = modal.querySelector('.cancel-btn');
  const closeBtn = modal.querySelector('.close-btn');
  const form = modal.querySelector('.form');
  const btnAddContact = modal.querySelector('.modal-btn-add-contact');

  console.log();

  function handlerCancelModal() {
    if (form) {
      form.reset();
      btnAddContact.removeEventListener('click', handlerAddContact);
    }
    modal.close();
    cancelBtn.removeEventListener('click', handlerCancelModal);
    closeBtn.removeEventListener('click', handlerCloseModal);
    modal.removeEventListener('click', handlerCloseBackdrop);
  }

  function handlerCloseModal() {
    if (form) {
      form.reset();
      btnAddContact.removeEventListener('click', handlerAddContact);
    }
    modal.close();
    closeBtn.removeEventListener('click', handlerCloseModal);
    cancelBtn.removeEventListener('click', handlerCancelModal);
    modal.removeEventListener('click', handlerCloseBackdrop);
  }

  cancelBtn.addEventListener('click', handlerCancelModal);

  closeBtn.addEventListener('click', handlerCloseModal);

  function handlerCloseBackdrop(event) {
    if (event.target === event.currentTarget) {
      if (form) {
        form.reset();
        btnAddContact.removeEventListener('click', handlerAddContact);
      }
      modal.close();
      modal.removeEventListener('click', handlerCloseBackdrop);
      closeBtn.removeEventListener('click', handlerCloseModal);
      cancelBtn.removeEventListener('click', handlerCancelModal);
    }
  }

  modal.addEventListener('click', handlerCloseBackdrop);
}

// Экспортируем функции
export {
  formatDate,
  formatTime,
  getIconContact,
  setContactInput,
  changeTypeInput,
  createContactInputBlock,
  closeModal,
  handlerAddContact,
};
