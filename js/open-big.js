import { CommentAvatarSize, NUMBER_OF_COMMENTS } from './constants.js';
import {
  isEscapeKey,
} from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const imgElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsCountContainerElement = bigPictureElement.querySelector('.social__comment-count');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const commentsContainerElement = bigPictureElement.querySelector('.social__comments');
const descriptionElement = bigPictureElement.querySelector('.social__caption');
const cancelElement = bigPictureElement.querySelector('.big-picture__cancel');


const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  const avatarElement = document.createElement('img');
  const messageElement = document.createElement('p');

  avatarElement.classList.add('social__picture');
  avatarElement.src = comment.avatar;
  avatarElement.alt = comment.name;

  avatarElement.width = CommentAvatarSize.WIDTH;
  avatarElement.height = CommentAvatarSize.HEIGHT;

  messageElement.classList.add('social__text');
  messageElement.textContent = comment.message;

  commentElement.classList.add('social__comment');
  commentElement.appendChild(avatarElement);
  commentElement.appendChild(messageElement);

  return commentElement;
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', bigPictureEscKeydownHandler);
  cancelElement.removeEventListener('click', closeBigPicture);
};

function bigPictureEscKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const renderComments = (comments, numberOfComments) => {
  const commentsFragment = document.createDocumentFragment();

  comments.slice(0, numberOfComments).forEach((comment) => {
    commentsFragment.appendChild(createCommentElement(comment));
  });

  commentsContainerElement.innerHTML = '';
  commentsContainerElement.appendChild(commentsFragment);

  commentsCountContainerElement.textContent = `${commentsContainerElement.children.length} из ${comments.length} комментариев`;

  // скрывает либо показывает кнопку в комментариях Загрузить ещё
  if (numberOfComments >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
};

const openBigPictureHandler = (post) => {
  let numberOfComments = NUMBER_OF_COMMENTS;

  bigPictureElement.classList.remove('hidden');

  cancelElement.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', bigPictureEscKeydownHandler);

  document.body.classList.add('modal-open');

  imgElement.src = post.url;
  likesCountElement.textContent = post.likes;
  commentsCountElement.textContent = post.comments.length;
  descriptionElement.textContent = post.description;

  renderComments(post.comments, numberOfComments);

  commentsLoaderElement.addEventListener('click', () => {
    numberOfComments += NUMBER_OF_COMMENTS;
    renderComments(post.comments, numberOfComments);
  });
};

export {
  openBigPictureHandler,
};
