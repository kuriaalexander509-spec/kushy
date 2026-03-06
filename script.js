// Initialize page
window.addEventListener('DOMContentLoaded', () => {
    createStars();
    createFloatingElements();
    displayTime();
    updateGreeting();
    setInterval(displayTime, 1000);
    setInterval(updateGreeting, 60000); // Update greeting every minute
});

// Create stars in background
function createStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Create floating elements
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    const elements = ['💕', '💖', '✨', '🌹'];
    
    function addElement() {
        const el = document.createElement('div');
        el.className = 'float-element';
        el.textContent = elements[Math.floor(Math.random() * elements.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.animationDuration = (Math.random() * 4 + 6) + 's';
        el.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(el);
        setTimeout(() => el.remove(), 10000);
    }
    
    setInterval(addElement, 800);
}

// Display current time
function displayTime() {
    const timeDisplay = document.getElementById('timeDisplay');
    if (!timeDisplay) return;
    
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeDisplay.textContent = `${hours}:${minutes}`;
}

// Update greeting based on time of day
function updateGreeting() {
    const greetingEl = document.querySelector('.elegant-title');
    if (!greetingEl) return;
    
    const now = new Date();
    const hour = now.getHours();
    
    let greeting = '';
    
    if (hour >= 5 && hour < 12) {
        greeting = 'Good Morning ☀️';
    } else if (hour >= 12 && hour < 17) {
        greeting = 'Good Afternoon ☀️';
    } else if (hour >= 17 && hour < 21) {
        greeting = 'Good Evening 🌅';
    } else {
        greeting = 'Good Night 🌙';
    }
    
    greetingEl.textContent = greeting;
}

// Screen navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// Flow control
function checkMood() {
    showScreen('screen2');
}

function handleGood() {
    triggerConfetti();
    setTimeout(() => {
        showScreen('screen4');
    }, 500);
}

function handleNotGood() {
    showScreen('screen3');
}

function continueJourney() {
    showScreen('screen4');
}

function buildSuspense() {
    showScreen('screen5');
    
    const messages = [
        'Something special...',
        'Just for you...',
        'A moment together...',
        'Three things...',
        'Loading my heart...'
    ];
    
    let index = 0;
    const msgElement = document.getElementById('suspenseMsg');
    
    function updateMessage() {
        if (index < messages.length) {
            msgElement.textContent = messages[index];
            msgElement.style.animation = 'none';
            setTimeout(() => {
                msgElement.style.animation = 'float-text 2s ease-in-out infinite';
            }, 10);
            index++;
            setTimeout(updateMessage, 1800);
        } else {
            showScreen('screen6');
        }
    }
    
    updateMessage();
}

function continueToGame() {
    showScreen('screen7');
    loadGameQuestions();
}

// Game logic
const gameQuestions = [
    'You are the most beautiful nurse I know 😍'
];

let currentQuestionIndex = 0;
let noButtonAttempts = 0;

function loadGameQuestions() {
    currentQuestionIndex = 0;
    noButtonAttempts = 0;
    displayGameQuestion();
}

function displayGameQuestion() {
    const questionEl = document.getElementById('gameQuestion');
    const evasiveBtn = document.getElementById('evasiveBtn');
    
    if (currentQuestionIndex < gameQuestions.length) {
        questionEl.textContent = gameQuestions[currentQuestionIndex];
        evasiveBtn.style.position = 'relative';
        evasiveBtn.style.left = '0';
        evasiveBtn.style.top = '0';
        evasiveBtn.textContent = 'Oops 😜';
        noButtonAttempts = 0;
    } else {
        showScreen('screen8');
    }
}

function handleGameYes() {
    currentQuestionIndex++;
    setTimeout(displayGameQuestion, 300);
}

function handleGameNo() {
    const evasiveBtn = document.getElementById('evasiveBtn');
    noButtonAttempts++;
    
    if (noButtonAttempts < 5) {
        // Move button away
        const randomX = (Math.random() - 0.5) * 250;
        const randomY = -(Math.random() * 150 + 80);
        
        evasiveBtn.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        evasiveBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    } else {
        // Hide button and continue
        evasiveBtn.style.opacity = '0';
        evasiveBtn.style.pointerEvents = 'none';
        
        setTimeout(() => {
            currentQuestionIndex++;
            setTimeout(displayGameQuestion, 300);
        }, 1500);
    }
}

function finalize() {
    triggerConfetti();
    setTimeout(() => {
        // Keep page open for 3 more seconds to enjoy the moment
        setTimeout(() => {
            window.location.href = 'about:blank';
        }, 3000);
    }, 500);
}

// Confetti animation
function triggerConfetti() {
    const colors = ['#ff1493', '#ff69b4', '#ffb6d9', '#ffc0cb'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.delay = Math.random() * 0.5 + 's';
        confetti.style.animation = 'confettiFall ' + (Math.random() * 2 + 2.5) + 's ease-out forwards';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
}
