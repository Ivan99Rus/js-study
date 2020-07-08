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
      countTimer('15 july 2020');

      // меню
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
      toggleMenu();

      // popup
      const toglePopUp = () => {
        const popup = document.querySelector('.popup'),
          popupBtns = document.querySelectorAll('.popup-btn');

        popupBtns.forEach((elem) => {
          elem.addEventListener('click', () => {
            popup.style.display = 'block';
          });
        });

        popup.addEventListener('click', (event) => {
          let target = event.target;

          if (target.classList.contains('popup-close')) {
            popup.style.display = 'none';
          } else {
            target = target.closest('.popup-content');

            if (!target) {
              popup.style.display = 'none';
            }
          }
        });
      };
      toglePopUp();

      // табы 
      const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
          tab = tabHeader.querySelectorAll('.service-header-tab'),
          tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
          for (let i = 0; i < tabContent.length; i++) {
            if (index === i) {
              tab[i].classList.add('active');
              tabContent[i].classList.remove('d-none');
            } else {
              tab[i].classList.remove('active');
              tabContent[i].classList.add('d-none');
            }
          }
        };

        tabHeader.addEventListener('click', (event) => {
          let target = event.target;
          target = target.closest('.service-header-tab');

          if (target) {
            tab.forEach((item, i) => {
              if (item === target) {
                toggleTabContent(i);
              }
            });
          }
        });
      };
      tabs();

      // слайдер 
      const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
          dotList = document.querySelector('.portfolio-dots'),
          slider = document.querySelector('.portfolio-content');
        let currentSlide = 0,
          interval;


        for (let i = 0; i < slide.length; i++) {
          let dotEl = document.createElement('li');
          dotEl.classList.add('dot');
          if (i === 0) {
            dotEl.classList.add('dot-active');
          }
          dotList.append(dotEl);
        }
        const dot = document.querySelectorAll('.dot');

        const prevSlide = (elem, index, strClass) => {
          elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
          elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
          prevSlide(slide, currentSlide, 'portfolio-item-active');
          prevSlide(dot, currentSlide, 'dot-active');

          currentSlide++;
          if (currentSlide >= slide.length) {
            currentSlide = 0;
          }

          nextSlide(slide, currentSlide, 'portfolio-item-active');
          nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
          interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
          clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
          event.preventDefault();

          let target = event.target;

          if (!target.matches('.portfolio-btn, .dot')) {
            return;
          }

          prevSlide(slide, currentSlide, 'portfolio-item-active');
          prevSlide(dot, currentSlide, 'dot-active');

          if (target.matches('#arrow-right')) {
            currentSlide++;
          } else if (target.matches('#arrow-left')) {
            currentSlide--;
          } else if (target.matches('.dot')) {
            dot.forEach((el, i) => {
              if (el === target) {
                currentSlide = i;
              }
            });
          }

          if (currentSlide >= slide.length) {
            currentSlide = 0;
          }
          if (currentSlide < 0) {
            currentSlide = slide.length - 1;
          }

          nextSlide(slide, currentSlide, 'portfolio-item-active');
          nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (e) => {
          if (e.target.matches('.portfolio-btn') ||
            e.target.matches('.dot')) {
            stopSlide();
          }
        });

        slider.addEventListener('mouseout', (e) => {
          if (e.target.matches('.portfolio-btn') ||
            e.target.matches('.dot')) {
            startSlide();
          }
        });

        startSlide(3000);
      };
      slider();

      // наша команда
      const team = () => {
        const command = document.getElementById('command');

        command.addEventListener('mouseover', (e) => {
          if (e.target.matches('.command__photo')) {
            e.target.src = e.target.dataset.img;
          }
        });

        command.addEventListener('mouseout', (e) => {
          if (e.target.matches('.command__photo')) {
            e.target.src = e.target.dataset.img.replace(/a(?=.jpg)/, '');
          }
        });
      };
      team();

      // валидация калькулятора
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
      calcValidate();

      // калькулятор
      const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcCount = document.querySelector('.calc-count'),
        calcDay = document.querySelector('.calc-day'),
        totalValue = document.getElementById('total');
        

        const countSum = () => {
          let total = 0,
          countValue = 1,
          dayValue = 1;
          const typeValue = calcType.options[calcType.selectedIndex].value,
          squareValue = +calcSquare.value;

          if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
          }

          if (calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
          } else if (calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
          }
          
          if (typeValue && squareValue) {
            total = price * typeValue * squareValue * countValue * dayValue;
          }
          
          totalValue.textContent = total;
        };

        calcBlock.addEventListener('change', (e) => {
            const target = e.target;

            if (target.matches('.calc-type') ||
                target.matches('.calc-square') ||
                target.matches('.calc-count') ||
                target.matches('.calc-day')) {
                  countSum();
              }
            });
        };
        calc(100);
      });