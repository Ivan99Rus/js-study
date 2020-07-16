import maskPhone from './maskPhone';

const validForm = (selector) => {
  const form = document.querySelector(selector);

  maskPhone(`${selector}-phone`);

  form.addEventListener('input', e => {
    if (e.target.id === `${selector.slice(1)}-name` || e.target.id === 'form2-message') {
      if (!(/^[А-Яа-яёЁ\s]*$/g.test(e.target.value))) {
        e.target.value = e.target.value.slice(0, -1);
      }
    }
  });
};

export default validForm;