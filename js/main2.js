'use strict';
{
  const words = [
    'apple',
    'orage',
    'sky',
    'blue',
    'red'
  ];
  let word;
  let loc;
  let score;
  let miss;
  let startTime;
  let isPlaying = false;
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const target = document.getElementById('target');
  const timerLabel = document.getElementById('timer2');
  const timeLimit = 3 * 1000;
  function updateTimer() {
    const timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(2);
    const timeoutId = setTimeout(() => {
      updateTimer();
    }, 10);
    if (timeLeft < 0) {
      clearTimeout(timeoutId);
      timerLabel.textContent = '0.00';
      isPlaying = false;
      setTimeout(() => {
        showScore();
      }, 100);
      target.textContent = "Click to replay";
    }
  }
  function showScore(){
    const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
    alert(`${score} letters, ${miss} misses, ${accuracy.toFixed(2)}% accuracy!`);
  }
  window.addEventListener('click',() => {
    if (isPlaying === true) {
      return;
    }
    isPlaying = true;
    loc = 0;
    score = 0;
    miss = 0;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    word = words[Math.floor(Math.random() * words.length)];
    target.textContent = word;
    startTime = Date.now();
    updateTimer();
  });
  function updateTarget() {
    let placeholder = '';
    for (let i = 0; i < loc; i++) {
      placeholder += '_';
    }
    target.textContent = placeholder + word.substring(loc);
  }
  window.addEventListener('keydown', (e) => {
    if (isPlaying !== true){
      return;
    }
    if (e.key === word[loc]){
      loc++;
      if (loc === word.length){
        word = words[Math.floor(Math.random() * words.length)];
        loc = 0;
      }
      updateTarget();
      score++;
      scoreLabel.textContent = score;
    }else {
      miss++;
      missLabel.textContent = miss;
    }
  });
}