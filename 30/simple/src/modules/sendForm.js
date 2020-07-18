const sendForm = (form) => {
  const erorMessage = 'Что-то пошло не так...',
    laodMessage = 'Загрузка...',
    successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = 'font-size: 2rem;';

  if (form.id === 'form3') {
    statusMessage.style.color = '#fff';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    let elementsForm = [...form.elements].filter(e => e.type.toLowerCase() !== 'button' && e.type !== 'submit');

    let valid = true;

    elementsForm.forEach(e => {
      try {
        if (e.classList.contains('error-input')) {
          valid = false;
          throw new Error('неверно заполненное поле');
        }
      } catch (error) {
        if (error) {
          console.error(error);
          valid = false;
        }
      }
    });

    const postData = (formData) => {
      return fetch('server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: formData
      });
    };

    const clearForm = () => {
      for (const el of form.elements) {
        if (el.tagName.toLowerCase() !== 'button' && el.type !== 'button') {
          el.value = '';
        }
      }
    };

    if (valid) {
      form.appendChild(statusMessage);
      statusMessage.textContent = laodMessage;

      postData(formData)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('status network not 200');
          }
          statusMessage.textContent = successMessage;
        })
        .catch((error) => {
          statusMessage.textContent = erorMessage;
          console.error(error);
        });
        clearForm();
    }
  });
};

export default sendForm;