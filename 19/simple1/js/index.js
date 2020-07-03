window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // timer 
  function countTimer(deadline) {
    let timerHours = document.getElementById('timer-hours'),
      timerMinutes = document.getElementById('timer-minutes'),
      timerSeconds = document.getElementById('timer-seconds');

    function getTimeRemaining() {
      let updateNum = (num) => String(num).length > 1 ? num : '0' + num;

      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = updateNum(Math.floor(timeRemaining % 60)),
        minutes = updateNum(Math.floor((timeRemaining / 60) % 60)),
        hours = updateNum(Math.floor(timeRemaining / 60 / 60));

      return {
        timeRemaining,
        hours,
        minutes,
        seconds
      };
    }

    function updateClock() {
      let timer = getTimeRemaining();

      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;

      if (timer.timeRemaining < 0) {
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
        clearInterval(interval);
      }
    }
    let interval = setInterval(() => updateClock());
  }
  countTimer('05 july 2020');


  // меню
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul>li');

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
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
  };
  toggleMenu();


  // popup
  const toglePopUp = () => {
    const popup = document.querySelector('.popup'),
      popupBtns = document.querySelectorAll('.popup-btn'),
      popupClose = document.querySelector('.popup-close');

    popupBtns.forEach((elem) => {
      elem.addEventListener('click', () => {
        popup.style.display = 'block';
      });
    });

    popupClose.addEventListener('click', () => popup.style.display = 'none');
  };
  toglePopUp();
});