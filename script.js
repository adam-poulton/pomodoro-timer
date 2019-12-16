/**
 * ---------------------------------------------------
 * state
 * ---------------------------------------------------
 */

const timerState = {
  current: undefined,
  startTime: undefined,
  isRunning: false,
  timeout: undefined,
}

const defaults = {
  startTime: 1500,
}

const timerValue = document.querySelector('#timer-value')

const setState = (ctx, key, val) => {
  if (key){
    ctx[key] = val;
  }
}

const getState = (ctx, key) => {
  if (key){
    return ctx[key];
  }
}

const setDefaults = () => {
  setState(timerState, 'startTime', getState(defaults, 'startTime'));
}

const setTimerText = (seconds) => timerValue.textContent = formatTime(seconds)

const tickTitle = (seconds) => document.title = `(${formatTime(seconds)}) PomodoroTimer`;

const formatTime = (timeSeconds) => {
  const seconds = timeSeconds < 0 ? 0 : timeSeconds
  let secs = seconds % 60;
  let mins = Math.floor(seconds / 60);
  secs = secs < 10 ? '0' + secs : '' + secs;
  mins = mins < 10 ? '0' + mins : '' + mins;
  return mins + ':' + secs
}

/**
 * ---------------------------------------------------
 * app
 * ---------------------------------------------------
 */

const resetTimer = () => {
  const startTime = getState(timerState, 'startTime')
  setState(timerState, 'isRunning', false);
  setState(timerState, 'current', startTime);
  tickTitle(startTime);
  setTimerText(startTime);
}

const countdown = () => {
  if(getState(timerState, 'isRunning')){
    seconds = getState(timerState, 'current') - 1
    setTimerText(seconds);
    tickTitle(seconds);
    setState(timerState, 'current', seconds);
    if(seconds > 0) {
      setTimeout(countdown, 1000);
    }
  }
};

const startCountdown = () => {
  if (!getState(timerState, 'isRunning')){
    setState(timerState, 'isRunning', true);
    countdown();
  }
};

const stopCountdown = () => {
  if (getState(timerState, 'isRunning')){
    setState(timerState, 'isRunning', false);
  }
};

const resetCountdown = () => {
  resetTimer();
}

const increment = () => {
  if (getState(timerState, 'isRunning')){
    setState(timerState, 'isRunning', false);
  }
  const newStartTime = getState(timerState, 'startTime') + 60
  if (newStartTime > 0) {
    setState(timerState, 'startTime', newStartTime)
  }
  resetTimer();
}

const decrement = () => {
  if (getState(timerState, 'isRunning')){
    setState(timerState, 'isRunning', false);
  }
  const newStartTime = getState(timerState, 'startTime') - 60
  if (newStartTime > 0) {
    setState(timerState, 'startTime', newStartTime)
  }
  resetTimer();
}

const setup = () => {
  setDefaults()
  resetTimer()
  document.querySelector('#start-button').addEventListener('click', startCountdown);
  document.querySelector('#stop-button').addEventListener('click', stopCountdown);
  document.querySelector('#reset-button').addEventListener('click', resetCountdown);
  document.querySelector('#increment').addEventListener('click', increment);
  document.querySelector('#decrement').addEventListener('click', decrement);
}

