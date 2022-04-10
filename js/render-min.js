import {
  openBigPictureHandler,
} from './modal.js';

const postTemplate = document.querySelector('#picture').content.querySelector('.picture');
const postsContainerElement = document.querySelector('.pictures');

const createElementPost = ({
  url,
  likes,
  comments,
}) => {
  const postElement = postTemplate.cloneNode(true);

  postElement.querySelector('.picture__img').src = url;
  postElement.querySelector('.picture__likes').textContent = likes;
  postElement.querySelector('.picture__comments').textContent = comments.length;

  return postElement;
};

const renderPosts = (gettedPosts) => {
  const postsFragment = document.createDocumentFragment();

  gettedPosts.forEach((post) => {
    const postElement = createElementPost(post);

    postElement.addEventListener('click', () => {
      openBigPictureHandler(post);
    });

    postsFragment.appendChild(postElement);
  });

  postsContainerElement.appendChild(postsFragment);
};

export {
  renderPosts,
};
