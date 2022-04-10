import {
  isEscapeKey,
} from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
const bigPictureLiksCountElement = bigPictureElement.querySelector('.likes-count');
const bigPictureCommentsCountElement = bigPictureElement.querySelector('.comments-count');
const bigPictureCommentsContainerElement = bigPictureElement.querySelector('.social__comments');
const bigPictureDescriptionElement = bigPictureElement.querySelector('.social__caption');
const bigPictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  const imgElement = document.createElement('img');
  const messageElement = document.createElement('p');

  imgElement.classList.add('social__picture');
  imgElement.src = comment.avatar;
  imgElement.alt = comment.name;

  //вынести в константы
  imgElement.width = 35;
  imgElement.height = 35;

  messageElement.classList.add('social__text');
  messageElement.textContent = comment.message;

  commentElement.classList.add('social__comment');
  commentElement.appendChild(imgElement);
  commentElement.appendChild(messageElement);

  return commentElement;
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', bigPictureEscKeydown);
  bigPictureCancelElement.removeEventListener('click', closeBigPicture);
};

function bigPictureEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const openBigPictureHandler = (post) => {
  const commentsFragment = document.createDocumentFragment();

  bigPictureElement.classList.remove('hidden');

  bigPictureCancelElement.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', bigPictureEscKeydown);

  document.body.classList.add('modal-open');

  bigPictureImgElement.src = post.url;
  bigPictureLiksCountElement.textContent = post.likes;
  bigPictureCommentsCountElement.textContent = post.comments.length;
  bigPictureDescriptionElement.textContent = post.description;

  post.comments.forEach((comment) => {
    commentsFragment.appendChild(createCommentElement(comment));
  });

  bigPictureCommentsContainerElement.replaceWith(commentsFragment);
};

export {
  openBigPictureHandler,
};
