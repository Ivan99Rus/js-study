const scrollMenu = () => {
  const menu = document.querySelector('menu'),
    serviceBlock = document.getElementById('service-block'),
    serviceBlockLink = document.querySelector('main').querySelector('a');

  menu.addEventListener('click', e => {
    e.preventDefault();

    const sectionId = e.target.getAttribute('href');

    document.querySelector(sectionId).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });

  serviceBlockLink.addEventListener('click', e => {
    e.preventDefault();

    serviceBlock.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });

};
export default scrollMenu;