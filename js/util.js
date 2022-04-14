const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successElement = successTemplate.cloneNode(true);

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorElement = errorTemplate.cloneNode(true);

const isEscapeKey = (evt) => evt.key === 'Escape';

const modalKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const modalWindowClickHandler = (evt) => {
  if (!evt.target.closest('div')) {
    evt.preventDefault();
    closeModal();
  }
};

const modalButtonClickHandler = () => {
  closeModal();
};

function closeModal() {
  if (document.body.contains(successElement)) {
    successElement.remove();
  }

  if (document.body.contains(errorElement)) {
    errorElement.remove();
  }

  document.removeEventListener('keydown', modalKeydownHandler);
  window.removeEventListener('click', modalWindowClickHandler);
}

const showSuccess = () => {
  document.body.appendChild(successElement);
  const successButton = successElement.querySelector('.success__button');

  document.addEventListener('keydown', modalKeydownHandler);
  window.addEventListener('click', modalWindowClickHandler);
  successButton.addEventListener('click', modalButtonClickHandler);
};

const showError = () => {
  document.body.appendChild(errorElement);
  const errorButton = errorElement.querySelector('.error__button');

  document.addEventListener('keydown', modalKeydownHandler);
  window.addEventListener('click', modalWindowClickHandler);
  errorButton.addEventListener('click', modalButtonClickHandler);
};

// возвращает массив неповторяющихся случайных элементов
const getRandomArrayElements = (elements, length) => elements.slice().sort(() => Math.random() - 0.5).slice(0, length);

const debounce = (callback, timeoutDelay = 500) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

const fileUploadHandler = (fileChooserElement, previewElement, allowedFileTypes) => {
  const file = fileChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = allowedFileTypes.some((it) => fileName.endsWith(it));

  if (matches) {
    previewElement.src = URL.createObjectURL(file);
  }
};

export {
  isEscapeKey,
  showSuccess,
  showError,
  getRandomArrayElements,
  debounce,
  fileUploadHandler,
};
