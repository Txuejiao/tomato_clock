let breakLengthUpArrow = document.querySelector(".breakLengthUpArrow");
let breakLengthDownArrow = document.querySelector(".breakLengthDownArrow");
let sessionLengthUpArrow = document.querySelector(".sessionLengthUpArrow");
let sessionLengthDownArrow = document.querySelector(".sessionLengthDownArrow");
let breakTimeArea = document.querySelector(".breakTime");
let sessionTimeArea = document.querySelector(".sessionTime")
let phase = "session"
let sessionTime = 25;
let breakTime = 5;
let initialTimeInSeconds = {
  session: 60 * sessionTime,
  break: 60 * breakTime,
}
let sessionTimeInSeconds = initialTimeInSeconds.session
let breakTimeInSeconds = initialTimeInSeconds.break
let clockSubject = document.querySelector(".clockSubject")
clockSubject.innerHTML = "session";
let clock = document.querySelector(".clock");

breakTimeDisplay(0);
sessionTimeDisplay(0);
clock.innerHTML = formatTime(sessionTimeInSeconds);
breakLengthDownArrow.onclick = function () {
  breakTimeDisplay(-1);
}
breakLengthUpArrow.onclick = function () {
  breakTimeDisplay(1);
}
sessionLengthDownArrow.onclick = function () {
  clearInterval(intervalId);
  sessionTimeDisplay(-1);
  clock.innerHTML = formatTime(sessionTimeInSeconds);
}
sessionLengthUpArrow.onclick = function () {
  clearInterval(intervalId);
  sessionTimeDisplay(1);
  clock.innerHTML = formatTime(sessionTimeInSeconds);
}

function breakTimeDisplay(diff) {
  breakTime += diff;
  breakTimeArea.innerHTML = breakTime;
}

function formatTime(leftSeconds) {
  let minutes = parseInt(leftSeconds / 60);
  let seconds = leftSeconds % 60;
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
}

function countDown() {
  if (phase === "session") {
    if (sessionTimeInSeconds >= 1) {
      sessionTimeInSeconds = sessionTimeInSeconds - 1;
      clock.innerHTML = formatTime(sessionTimeInSeconds);
    } else {
      changePhase()
    }
  } else {
    if (breakTimeInSeconds >= 1) {
      breakTimeInSeconds = breakTimeInSeconds - 1;
      clock.innerHTML = formatTime(breakTimeInSeconds);
    } else {
      changePhase()
    }
  }
}

function changePhase() {
  phase === "session" ? phase = "break" : phase = "session";
  clockSubject.innerHTML = phase;
  sessionTimeInSeconds = initialTimeInSeconds.session;
  breakTimeInSeconds = initialTimeInSeconds.break;
  let alarm = new Audio("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav");
  alarm.play();
  setTimeout(function () {
    alarm.pause()
  }, 2000);
}

function sessionTimeDisplay(diff) {
  sessionTime += diff;
  sessionTimeInSeconds = sessionTime * 60;
  sessionTimeArea.innerHTML = sessionTime;
}

let intervalId = null;
let playButton = document.querySelector(".startButton");
playButton.onclick = function () {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  } else {
    intervalId = setInterval(countDown, 1000);
  }
  console.log(intervalId);
}
let resetButton = document.querySelector(".resetButton");
resetButton.onclick = function () {
  sessionTimeInSeconds = sessionTime * 60;
  clock.innerHTML = formatTime(sessionTimeInSeconds);
  clearInterval(intervalId);
}
