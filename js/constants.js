const MAX_COMMENT_LENGTH = 140;
const MAX_NUMBER_OF_HASHTAGS = 5;
const HASHTAG_REGEXP = /^#(?=.*[^0-9])[a-zа-яё0-9]{1,19}$/i;
const NUMBER_OF_COMMENTS = 5;
const ScaleParams = {
  DEFAULT_SIZE: 1,
  CHANGE_STEP: 0.25,
  MAX: 1,
  MIN: 0,
};
const IMAGE_EFFECT_CLASS_PREFIX = 'effects__preview--';
const DEFAULT_EFFECT = 'none';
const CssFilterMap = {
  CHROME: {
    TYPE: 'chrome',
    FILTER: 'grayscale',
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    UNITS: '',
  },
  SEPIA: {
    TYPE: 'sepia',
    FILTER: 'sepia',
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    UNITS: '',
  },
  MARVIN: {
    TYPE: 'marvin',
    FILTER: 'invert',
    MIN: 0,
    MAX: 100,
    STEP: 1,
    UNITS: '%',
  },
  PHOBOS: {
    TYPE: 'phobos',
    FILTER: 'blur',
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
    UNITS: 'px',
  },
  HEAT: {
    TYPE: 'heat',
    FILTER: 'brightness',
    MIN: 1,
    MAX: 3,
    STEP: 0.1,
    UNITS: '',
  },
};

const LoadErrorPopup = {
  MESSAGE: 'Произошла ошибка загрузки данных',
  CSS: 'position: absolute; z-index: 1000; padding: 20px; border: 2px solid #d41919; color: #d41919; font-weight: bold; background: rgba(0,0,0,0.7); font-size: 20px; top: 5%; left: 50%; transform: translate(-50%, 0);',
};

const CommentAvatarSize = {
  WIDTH: 35,
  HEIGHT: 35,
};

const DEFAULT_POSTS_NUMBER = 10;

const RERENDER_DELAY = 500;

const DEFAULT_IMG_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

export {
  MAX_COMMENT_LENGTH,
  MAX_NUMBER_OF_HASHTAGS,
  HASHTAG_REGEXP,
  NUMBER_OF_COMMENTS,
  ScaleParams,
  DEFAULT_EFFECT,
  IMAGE_EFFECT_CLASS_PREFIX,
  CssFilterMap,
  LoadErrorPopup,
  CommentAvatarSize,
  DEFAULT_POSTS_NUMBER,
  RERENDER_DELAY,
  DEFAULT_IMG_TYPES,
};
