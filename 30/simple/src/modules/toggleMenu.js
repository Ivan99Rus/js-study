const toggleMenu = () => {
  const btnMenu = document.querySelector('.menu'),
    menu = document.querySelector('menu');

  const handlerMenu = () => {
    let countShow = 0,
      countHide = 100,
      showMenu = function () {
        if (document.body.clientWidth > 576) {
          countShow += 2;
          menu.style.left = countShow + '%';
          if (countShow < 100) {
            setTimeout(showMenu, 0);
          }
        } else {
          menu.style.left = 100 + '%';
        }
      },
      hideMenu = function () {
        if (document.body.clientWidth > 576) {
          countHide -= 2;
          menu.style.left = countHide + '%';
          if (countHide > 0) {
            setTimeout(hideMenu, 0);
          }
        } else {
          menu.style.left = 0 + '%';
        }
      };

    if (!menu.style.left || menu.style.left === '0%') {
      showMenu();
    } else {
      hideMenu();
    }
  };

  btnMenu.addEventListener('click', handlerMenu);
  menu.addEventListener('click', (e) => {
    let target = e.target;

    if (target.classList.contains('close-btn') || target.tagName === 'A') {
      handlerMenu();
    }
  });

};

export default toggleMenu;