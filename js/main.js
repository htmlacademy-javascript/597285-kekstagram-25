import {
  getData,
} from './api.js';
import {
  showFilters,
} from './filters.js';
import {
  initializeForm,
} from './form.js';
import {
  renderPosts,
} from './render-min.js';

let gettedPosts;

getData((gettedData) => {
  gettedPosts = gettedData;
  showFilters();
  renderPosts(gettedData);
});

initializeForm();

export {
  gettedPosts,
};
