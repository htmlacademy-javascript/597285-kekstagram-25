import {
  DEFAULT_POSTS_NUMBER,
  RERENDER_DELAY,
} from './constants.js';
import {
  gettedPosts,
} from './main.js';
import {
  removePosts,
  renderPosts,
} from './render-min.js';
import {
  debounce,
  getRandomArrayElements,
} from './util.js';

const filtersContainerElement = document.querySelector('.img-filters');

const filters = {
  'filter-default': () => {
    renderPosts(gettedPosts);
  },
  'filter-random': () => {
    renderPosts(getRandomArrayElements(gettedPosts, DEFAULT_POSTS_NUMBER));
  },
  'filter-discussed': () => {
    renderPosts(gettedPosts.slice().sort((a, b) => b.comments.length - a.comments.length));
  },
};

const removeActiveClassButton = () => {
  const activeButtonElement = filtersContainerElement.querySelector('.img-filters__button--active');
  activeButtonElement.classList.remove('img-filters__button--active');
};

const filtersClickHandler = debounce((evt) => {
  const buttonElement = evt.target.closest('button');

  if (!buttonElement) {
    return;
  }

  removeActiveClassButton();
  buttonElement.classList.add('img-filters__button--active');

  removePosts();
  filters[buttonElement.id]();
}, RERENDER_DELAY);

const showFilters = () => {
  filtersContainerElement.classList.remove('img-filters--inactive');
  filtersContainerElement.addEventListener('click', filtersClickHandler);
};

export {
  showFilters,
};
