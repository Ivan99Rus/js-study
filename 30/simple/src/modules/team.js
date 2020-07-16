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

export default team;