let timeLeft;
let timerDuration = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isWorkMode = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const workMode = document.getElementById('work-mode');
const restMode = document.getElementById('rest-mode');
const modeToggle = document.getElementById('mode-toggle');
const container = document.querySelector('.container');
const timerBell = document.getElementById('timer-bell');
const WORK_TIME = 25 * 60; // 25 minutes
const REST_TIME = 5 * 60;  // 5 minutes

function playBellSound() {
    timerBell.currentTime = 0; // Reset the audio to start
    timerBell.play();
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update the display elements
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update the browser tab title
    document.title = `${timeString} - ${isWorkMode ? 'Work' : 'Rest'} Timer`;
}

function startTimer() {
    if (timerId === null) {
        if (timeLeft === undefined) {
            timeLeft = timerDuration;
        }
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                playBellSound();
                timeLeft = timerDuration;
                updateDisplay();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = timerDuration;
    updateDisplay();
}

function toggleMode() {
    isWorkMode = !isWorkMode;
    timerDuration = isWorkMode ? WORK_TIME : REST_TIME;
    modeToggle.textContent = isWorkMode ? 'Switch to Rest Mode' : 'Switch to Work Mode';
    modeToggle.className = isWorkMode ? 'work-mode' : 'rest-mode';
    container.style.backgroundColor = isWorkMode ? '#2d2d2d' : '#1e1a2b';  // Darker purple for rest mode
    resetTimer();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
modeToggle.addEventListener('click', toggleMode);

// Initialize display
resetTimer();

// Initialize the toggle button
modeToggle.className = 'work-mode';