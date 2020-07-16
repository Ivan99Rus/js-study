const calcValidate = () => {
  const calcBlock = document.querySelector('.calc-block');

  calcBlock.addEventListener('input', (e) => {
    if (e.target.matches('.calc-square') ||
      e.target.matches('.calc-count') ||
      e.target.matches('.calc-day')) {
      e.target.value = e.target.value.replace(/\D/g, '');
    }
  });
};

export default calcValidate;