const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((gettedData) => {
      onSuccess(gettedData);
    })
    .catch(() => {});
};

export {
  getData,
};
