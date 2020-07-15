'use strict';

const API_KEY = 'trnsl.1.1.20190704T212630Z.c409bb9604ae7251.df09dbd89372575b02298ed0970f8e45c749648b';

const en = document.querySelector('.textarea-en'),
  ru = document.querySelector('.textarea-ru'),
  textareaBlock = document.querySelector('.textarea-block');

const showRes = (lang, res) => {
  lang === 'en' ? ru.value = res : en.value = res;
};

const translate = (langType, value) => {
  let res, lang;
  const text = value,
  request = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${API_KEY}&text=${text}&lang=${langType}`;
  
  fetch(request)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('status network not 200');
      }
      return (response.json());
    })
    .then((data) => {
      res = data.text.join('');
      lang = data.lang.split('-')[0];
      showRes(lang, res);
    })
    .catch((error) => console.error(error));
};

const handlerInput = (className, value) => {
  className === 'textarea-en' ? translate('en-ru', value) : translate('ru-en', value);
};

textareaBlock.addEventListener('input', e => {
  const target = e.target,
    className = target.classList[1],
    value = target.value;

    if (value.trim() !== '') {
      handlerInput(className, value);
    } else {
      en.value = '';
      ru.value = '';
    }
});