import {
  getData,
} from './api.js';
import {
  initializeForm,
} from './form.js';
import {
  renderPosts,
} from './render-min.js';

let gettedPosts;

getData((gettedData) => {
  gettedPosts = gettedData;
  console.log(gettedPosts);
  renderPosts(gettedData);
});

initializeForm();
