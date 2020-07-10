class Validator {
  constructor({
    selector,
    pattern = {},
    method,
    errorType = 'div',
    errorClass = 'validator-error'
  }) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;
    this.errorType = errorType;
    this.errorClass = errorClass;
    this.elementsForm = [...this.form.elements].filter(item => item.tagName.toLowerCase() !== 'button' &&
    item.type !== 'button');
    this.error = new Set();
  }

  init() {
    this.applyStyle();
    this.setPattern();
    this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkit.bind(this)));
    this.form.addEventListener('submit', e => {
      this.elementsForm.forEach(elem => this.checkit({
        target: elem
      }));
      if (this.error.size) {
        e.preventDefault();
      }
    });
  }

  isValid(elem) {
    const validatorMethod = {
      notEmpty(elem) {
        if (elem.value.trim() === '') {
          return false;
        }
        return true;
      },
      pattern(elem, pattern) {
        return pattern.test(elem.value);
      }
    };

    if (this.method) {
      const method = this.method[elem.id];

      if (method) {
        return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
      }
    } else {
      console.warn('Необходимо передать id полей ввода и методы проверки этих полей!');
    }

    return true;
  }

  checkit(e) {
    const target = e.target;

    if (this.isValid(target)) {
      this.showSuccess(target);
      this.error.delete(target);
    } else {
      this.showError(target);
      this.error.add(target);
    }
  }

  showError(elem) {
    elem.classList.remove('success');
    elem.classList.add('error');
    
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains(this.errorClass)) {
      return;
    }

    const errorElem = document.createElement(this.errorType);
    errorElem.textContent = 'Ошибка в этом поле';
    //errorElem.classList.add('validator-error');
    errorElem.classList.add(this.errorClass);
    elem.insertAdjacentElement('afterend', errorElem);
    elem.parentNode.classList.add('input-form1-wrapper-error');
  }

  showSuccess(elem) {
    elem.classList.remove('error');
    elem.classList.add('success');

    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains(this.errorClass)) {
      elem.nextElementSibling.remove();
    } 

    if (elem.parentNode.classList.contains('input-form1-wrapper-error')) {
      elem.parentNode.classList.remove('input-form1-wrapper-error');
    }

    elem.value = elem.value;
  }

  applyStyle() {
    const style = document.createElement('style');

    style.textContent = `
    input.success {
      border: 2px solid green !important;
      color: green !important;
    }
    input.error {
      border: 2px solid red !important;
      color: red !important;
    }
    .${this.errorClass} {
      font-size: 12px;
      font-family: sans-serif;
      color: red;
    }
    .input-form1-wrapper-error {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
    }
    `;

    document.head.appendChild(style);
  }

  setPattern() {
    if (!this.pattern.phone) {
      this.pattern.phone = /^\+?[7-8]([-()]*\d){10}$/;
    }

    if (!this.pattern.email) {
      this.pattern.email = /^\w+@\w+\.\w{2,}$/;
    }
  }
}