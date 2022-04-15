import {
  sendData,
} from './api.js';
import {
  CssFilterMap,
  HASHTAG_REGEXP,
  DEFAULT_EFFECT,
  MAX_COMMENT_LENGTH,
  MAX_NUMBER_OF_HASHTAGS,
  IMAGE_EFFECT_CLASS_PREFIX,
  ScaleParams,
  DEFAULT_IMG_TYPES,
} from './constants.js';
import {
  isEscapeKey,
  showError,
  showSuccess,
  fileUploadHandler,
} from './util.js';

const formElement = document.querySelector('.img-upload__form');
const uploadFileInputElement = formElement.querySelector('#upload-file');
const imgUploadOverleyElement = formElement.querySelector('.img-upload__overlay');
const imgUploadCancelElement = formElement.querySelector('.img-upload__cancel');
const hashtagsInputElement = formElement.querySelector('.text__hashtags');
const descriptionElement = formElement.querySelector('.text__description');
const sliderElement = formElement.querySelector('.effect-level__slider');
const effectInputElement = formElement.querySelector('.effect-level__value');
const submitButtonElement = formElement.querySelector('.img-upload__submit');

const previewImageElement = formElement.querySelector('.img-upload__preview img');
const scaleControlSmallerElement = formElement.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = formElement.querySelector('.scale__control--bigger');
const scaleControlValueElement = formElement.querySelector('.scale__control--value');
const effectsRadioContainerElement = formElement.querySelector('.img-upload__effects');
const effectsRadioInputElements = Array.from(formElement.querySelectorAll('.effects__radio'));

const initializeNoUiSlider = (changedEffect) => {
  changedEffect = changedEffect.toUpperCase();

  if (changedEffect !== 'NONE') {
    sliderElement.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: CssFilterMap[changedEffect].MIN,
        max: CssFilterMap[changedEffect].MAX,
      },
      start: CssFilterMap[changedEffect].MAX,
      step: CssFilterMap[changedEffect].STEP,
    });
  } else {
    sliderElement.classList.add('hidden');
  }
};

const getScale = () => +scaleControlValueElement.value.slice(0, -1) / 100;
const setScale = (value) => {
  scaleControlValueElement.value = `${value * 100}%`;
  previewImageElement.style.transform = `scale(${value})`;
};

const scaleControlSmallerHandler = () => {
  let scale = getScale();
  scale = (scale - ScaleParams.CHANGE_STEP < ScaleParams.MIN ? ScaleParams.MIN : scale - ScaleParams.CHANGE_STEP);
  setScale(scale);
};

const scaleControlBiggerHandler = () => {
  let scale = getScale();
  scale = (scale + ScaleParams.CHANGE_STEP > ScaleParams.MAX ? ScaleParams.MAX : scale + ScaleParams.CHANGE_STEP);
  setScale(scale);
};

const getEffect = (element) => {
  if (element) {
    return element.value;
  }
  // если параметр не передан - возвращает выбранный эффект
  return effectsRadioInputElements.find((el) => el.checked).value;
};

const applyEffectLevel = (level) => {
  const changedEffect = getEffect().toUpperCase();

  if (changedEffect !== 'NONE') {
    previewImageElement.style.filter = `${CssFilterMap[changedEffect].FILTER}(${level}${CssFilterMap[changedEffect].UNITS})`;
  } else {
    previewImageElement.style.filter = '';
  }
};

const setEffect = (value) => {
  // снимем выбор со всех кнопок эффектов и с превью все классы эффектов
  effectsRadioInputElements.forEach((el) => {
    el.checked = false;
    previewImageElement.classList.remove(`${IMAGE_EFFECT_CLASS_PREFIX}${getEffect(el)}`);
  });

  // установим нужный класс с эффектом на превью
  for (const el of effectsRadioInputElements) {
    if (getEffect(el) === value) {
      el.checked = true;
      previewImageElement.classList.add(`${IMAGE_EFFECT_CLASS_PREFIX}${value}`);
      break;
    }
  }

  // установка настроек слайдера
  initializeNoUiSlider(value);
  applyEffectLevel(value);
};

const effectsRadioClickHandler = (evt) => {
  if (evt.target.type === 'radio') {
    const newEffect = getEffect(evt.target);
    setEffect(newEffect);
  }
};

const enableFilters = () => {
  // Scale фильтр
  setScale(ScaleParams.DEFAULT_SIZE);

  scaleControlSmallerElement.addEventListener('click', scaleControlSmallerHandler);
  scaleControlBiggerElement.addEventListener('click', scaleControlBiggerHandler);

  // Effects фильтр
  setEffect(DEFAULT_EFFECT);

  effectsRadioContainerElement.addEventListener('click', effectsRadioClickHandler);
};

const disableFilters = () => {
  scaleControlSmallerElement.removeEventListener('click', scaleControlSmallerHandler);
  scaleControlBiggerElement.removeEventListener('click', scaleControlBiggerHandler);
  effectsRadioContainerElement.removeEventListener('click', effectsRadioClickHandler);
};

const closeImgUpload = () => {
  imgUploadOverleyElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFileInputElement.value = '';

  document.removeEventListener('keydown', imgUploadEscKeydownHandler);
  imgUploadCancelElement.removeEventListener('click', closeImgUpload);

  disableFilters();
};

const isNotDescriptionElement = (evt) => evt.target !== descriptionElement;
const isNothashtagsInputElement = (evt) => evt.target !== hashtagsInputElement;

function imgUploadEscKeydownHandler(evt) {
  if (isEscapeKey(evt) && isNotDescriptionElement(evt) && isNothashtagsInputElement(evt)) {
    evt.preventDefault();
    closeImgUpload();
  }
}

const loadPhoto = () => {
  previewImageElement.src = '';

};

const changeUploadFileHandler = () => {
  loadPhoto();
  fileUploadHandler(uploadFileInputElement, previewImageElement, DEFAULT_IMG_TYPES);

  imgUploadOverleyElement.classList.remove('hidden');

  imgUploadCancelElement.addEventListener('click', closeImgUpload);
  document.addEventListener('keydown', imgUploadEscKeydownHandler);

  document.body.classList.add('modal-open');

  enableFilters();
};

const createFormValidator = () => {
  const pristine = new window.Pristine(formElement, {
    classTo: 'img-upload__text',
    errorTextParent: 'img-upload__text',
  });

  const validateHashtags = (value) => {
    if (!value) {
      //если поле пустое - валидация пройдена
      return true;
    }

    const hashtags = value.split(' ');

    if (hashtags.length >= MAX_NUMBER_OF_HASHTAGS) {
      //если превышено максимальное кол-во хэштегов - валидация не пройдена
      return false;
    }

    for (const hashtag of hashtags) {
      if (!HASHTAG_REGEXP.test(hashtag)) {
        // если хэштег не удовлетворяет регулярному выражению - валидация не пройдена
        return false;
      }
    }

    // проверка на повторяющиеся хэштеги
    if (new Set(hashtags).size !== hashtags.length) {
      // если хэштег повторяется - валидация не пройдена
      return false;
    }

    // во всех остальных случаях валидация пройдена
    return true;
  };

  const validateDescription = (value) => value.length <= MAX_COMMENT_LENGTH;

  const getHashtagsMessage = () => 'Список хэш-тегов не валиден';

  const getDescriptionMessage = () => 'Длина комментария не должна превышать 140 символов';

  //СОЗДАНИЕ ВАЛИДАТОРОВ
  pristine.addValidator(hashtagsInputElement, validateHashtags, getHashtagsMessage);
  pristine.addValidator(descriptionElement, validateDescription, getDescriptionMessage);

  //НАВЕШИВАНИЕ ВАЛИДАТОРОВ
  hashtagsInputElement.addEventListener('change', () => {
    pristine.validate(hashtagsInputElement);
  });

  descriptionElement.addEventListener('change', () => {
    pristine.validate(descriptionElement);
  });

  // ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ
  const blockSubmitButton = () => {
    submitButtonElement.disabled = true;
  };
  const unblockSubmitButton = () => {
    submitButtonElement.disabled = false;
  };

  //ОТПРАВКА ФОРМЫ
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      blockSubmitButton();
      sendData(
        () => {
          unblockSubmitButton();
          closeImgUpload();
          showSuccess();
        },
        () => {
          unblockSubmitButton();
          closeImgUpload();
          showError();
        },
        new FormData(evt.target));
    }
  });
};

const sliderUpdateHandler = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  effectInputElement.value = sliderValue;
  applyEffectLevel(sliderValue);
};

const createNoUiSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 0,
    },
    start: 0,
    step: 0,
    connect: 'lower',
    format: {
      to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
      from: (value) => parseFloat(value),
    },
  });

  sliderElement.noUiSlider.on('update', sliderUpdateHandler);
};

const initializeForm = () => {
  createFormValidator();
  createNoUiSlider();

  uploadFileInputElement.addEventListener('change', changeUploadFileHandler);
};

export {
  initializeForm,
};
