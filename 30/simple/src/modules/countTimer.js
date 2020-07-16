const countTimer = (deadline) => {
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
};

export default countTimer;