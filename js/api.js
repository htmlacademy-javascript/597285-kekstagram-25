import {
  LoadErrorPopup,
} from './constants.js';

const startImg = document.querySelector('.img-upload__start');
const messageElement = document.createElement('div');
messageElement.textContent = LoadErrorPopup.MESSAGE;
messageElement.style.cssText = LoadErrorPopup.CSS;

const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((gettedData) => {
      onSuccess(gettedData);
    })
    .catch(() => {
      startImg.appendChild(messageElement);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://25.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body: body,
  })
    .then((response) => {
      if (response.status === 200) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {
  getData,
  sendData,
};
