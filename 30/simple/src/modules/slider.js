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

export default slider;