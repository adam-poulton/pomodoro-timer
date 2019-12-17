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
  mode: 'pomodoro',
  breakStartTime: undefined,
}

const defaults = {
  startTime: 1500,
  breakStartTime: 300,
}

const alarm = new Audio('alarmwatch.wav');

const playAlarm = () => alarm.play();

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
  setState(timerState, 'breakStartTime', getState(defaults, 'breakStartTime'));
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

const toggleButtons = (active) => {
  document.querySelectorAll("#timer-selection button").forEach(item => 
    item.classList.remove('active'));
  document.querySelector("#" + active).classList.add('active');
}

/**
 * ---------------------------------------------------
 * app
 * ---------------------------------------------------
 */

const resetTimer = () => {
  const mode = getState(timerState, 'mode');
  let newTime = (mode == 'pomodoro') ? getState(timerState, 'startTime') : getState(timerState, 'breakStartTime');
  setState(timerState, 'isRunning', false);
  setState(timerState, 'current', newTime);
  tickTitle(newTime);
  setTimerText(newTime);
}

const countdown = () => {
  if(getState(timerState, 'isRunning')){
    seconds = getState(timerState, 'current')
    setTimerText(seconds);
    tickTitle(seconds);
    setState(timerState, 'current', seconds - 1);
    if(seconds > 0) {
      setTimeout(countdown, 1000);
    } else if(seconds == 0){
      playAlarm();
      console.log("BUZZ!!");
    } else{
      console.log(seconds);
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
  const mode = getState(timerState, 'mode');
  let newStartTime;
  if (mode == 'pomodoro'){
    newStartTime = Math.min(3600, getState(timerState, 'startTime') + 60)
    setState(timerState, 'startTime', newStartTime)
  } else if (mode =='break'){
    newStartTime = Math.min(3600, getState(timerState, 'breakStartTime') + 60)
    setState(timerState, 'breakStartTime', newStartTime)
  }
  resetTimer();
}

const decrement = () => {
  if (getState(timerState, 'isRunning')){
    setState(timerState, 'isRunning', false);
  }
  const mode = getState(timerState, 'mode');
  let newStartTime;
  if (mode == 'pomodoro'){
    newStartTime = Math.max(60, getState(timerState, 'startTime') - 60)
    setState(timerState, 'startTime', newStartTime)
  } else if(mode == 'break'){
    newStartTime = Math.max(60, getState(timerState, 'breakStartTime') - 60)
    setState(timerState, 'breakStartTime', newStartTime);
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
  document.querySelectorAll('#timer-selection button').forEach(item => {
    item.addEventListener('click', event => {
      toggleButtons(event.target.id);
      setState(timerState, 'mode', event.target.id);
      resetTimer();
    })
  })

}

