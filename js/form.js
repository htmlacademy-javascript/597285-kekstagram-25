const formElement = document.querySelector('.img-upload__form');
const uploadFileInputElement = formElement.querySelector('#upload-file');
const imgUploadOverleyElement = formElement.querySelector('.img-upload__overlay');

const changeUploadFileHandler = () => {
  imgUploadOverleyElement.classList.remove('hidden');
};

const initializeForm = () => {
  uploadFileInputElement.addEventListener('change', changeUploadFileHandler);
};

export {
  initializeForm,
};
