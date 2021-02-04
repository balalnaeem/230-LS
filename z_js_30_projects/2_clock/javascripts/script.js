const secondsHand = document.querySelector('.second-hand');
const minutesHand = document.querySelector('.min-hand');
const hoursHand = document.querySelector('.hour-hand');

function setDate() {
  const now = new Date();

  const seconds = now.getSeconds();
  const mins = now.getMinutes();
  const hours = now.getHours();

  const secondsDegree = ((seconds / 60) * 360) + 90;
  const minsDegree = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
  const hoursDegree = ((hours / 12) * 360) + ((mins /60) * 30) + 90

  secondsHand.style.transform = `rotate(${secondsDegree}deg)`;
  minutesHand.style.transform = `rotate(${minsDegree}deg)`;
  hoursHand.style.transform = `rotate(${hoursDegree}deg)`;
}

setInterval(setDate, 1000);
setDate();
