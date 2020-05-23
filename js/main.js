'use strict';
{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  let startTime;
  let timeoutId;
  let elapsedTime = 0;

  function countUp(){
    //console.log(Date.now() - startTime);
    const d = new Date(Date.now() - startTime + elapsedTime);
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = d.getSeconds();
    const ms = d.getMilliseconds();
    timer.textContent = `${m}:${s}.${ms}`
    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }
  function setButtonStateInitial(){
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = true
  }
  function setButtonStateRunning(){
    start.disabled = true;
    stop.disabled = false;
    reset.disabled = true
  }
  function setButtonStateStopped(){
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = false;
  }
  setButtonStateInitial()
  start.addEventListener('click', () => {
    setButtonStateRunning()
    startTime = Date.now();
    countUp();
  });
  stop.addEventListener('click', () => {
    setButtonStateStopped()
    clearTimeout(timeoutId);
    elapsedTime += Date.now() - startTime;
  });
  reset.addEventListener('click', () => {
    setButtonStateInitial()
    timer.textContent = '00:00.000'
    elapsedTime += 0;
  })
}
