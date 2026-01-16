let score = 0;
let health = 100;
let gameInterval, spawnInterval;
let asteroids = [];
let gameSpeed = 2500;

const gameArea = document.getElementById('game-area');
const scoreEl = document.getElementById('score');
const healthEl = document.getElementById('health');
const inputEl = document.getElementById('player-input');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScoreEl = document.getElementById('final-score');

function startGame() {
    score = 0;
    health = 100;
    asteroids = [];
    gameSpeed = 2500;
    scoreEl.innerText = score;
    healthEl.innerText = health;
    
    gameArea.innerHTML = '';
    gameArea.appendChild(startScreen);
    gameArea.appendChild(gameOverScreen);
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    
    inputEl.value = '';
    inputEl.focus();
    
    // Run the game loop slightly faster for smoother movement
    gameInterval = setInterval(updateGameLoop, 16); 
    spawnInterval = setInterval(createAsteroid, gameSpeed);
}

function createAsteroid() {
    const operations = ['+', '-', '*', '/'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    
    let num1, num2, answer, displayEquation;

    
    switch(op) {
        case '+':
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            answer = num1 + num2;
            displayEquation = `${num1} + ${num2}`;
            break;
        case '-':
            num1 = Math.floor(Math.random() * 15) + 5; 
            num2 = Math.floor(Math.random() * num1);
            answer = num1 - num2;
            displayEquation = `${num1} - ${num2}`;
            break;
        case '*':
            num1 = Math.floor(Math.random() * 6) + 1;
            num2 = Math.floor(Math.random() * 5) + 1;
            answer = num1 * num2;
            displayEquation = `${num1} × ${num2}`;
            break;
        case '/':
            answer = Math.floor(Math.random() * 5) + 2;
            num2 = Math.floor(Math.random() * 4) + 2;
            num1 = answer * num2;
            displayEquation = `${num1} ÷ ${num2}`;
            break;
    }

    const asteroidEl = document.createElement('div');
    asteroidEl.classList.add('asteroid');
    
    // Apply the correct CSS class to load the specific rock asset
    if(op === '+') asteroidEl.classList.add('plus');
    if(op === '-') asteroidEl.classList.add('minus');
    if(op === '*') asteroidEl.classList.add('multi');
    if(op === '/') asteroidEl.classList.add('divi');

    asteroidEl.innerText = displayEquation;
    
    // Position setup
    // Ensure it doesn't spawn off the right edge (game width - asteroid width)
    const maxLeft = gameArea.clientWidth - 110; 
    asteroidEl.style.left = Math.floor(Math.random() * maxLeft) + 'px';
    // Start just above the visible area
    asteroidEl.style.top = '-110px';

    gameArea.appendChild(asteroidEl);

    asteroids.push({
        element: asteroidEl,
        answer: answer,
        top: -110
    });
}

function updateGameLoop() {
    asteroids.forEach((asteroid, index) => {
        // Movement speed
        asteroid.top += 1.2; 
        asteroid.element.style.top = asteroid.top + 'px';

       
        if (asteroid.top > (gameArea.clientHeight - 120)) {
            explode(asteroid.element.offsetLeft, asteroid.element.offsetTop);
            asteroid.element.remove();
            asteroids.splice(index, 1);
            takeDamage(20);
        }
    });
}

inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        
        if(inputEl.value === '') return;
        
        const value = parseInt(inputEl.value);
        checkAnswer(value);
        inputEl.value = '';
    }
});

function checkAnswer(value) {
    const matchIndex = asteroids.findIndex(a => a.answer === value);

    if (matchIndex !== -1) {
        const asteroid = asteroids[matchIndex];
        
        
        explode(asteroid.element.offsetLeft, asteroid.element.offsetTop);
        
        asteroid.element.remove();
        asteroids.splice(matchIndex, 1);
        
        score += 10;
        scoreEl.innerText = score;
        
        
        if(score % 50 === 0 && gameSpeed > 800) {
            clearInterval(spawnInterval);
            gameSpeed -= 200;
            spawnInterval = setInterval(createAsteroid, gameSpeed);
        }
    } else {
        
        inputEl.style.borderColor = "red";
        inputEl.style.transform = "translateX(5px)";
        setTimeout(() => {
             inputEl.style.transform = "translateX(0)";
             inputEl.style.borderColor = "#4a69bd";
        }, 100);
    }
}


function explode(x, y) {
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        particle.style.left = (x + 55) + 'px'; 
        particle.style.top = (y + 55) + 'px';
        
        gameArea.appendChild(particle);

        
        const destX = (Math.random() - 0.5) * 250;
        const destY = (Math.random() - 0.5) * 250;
        const rotate = Math.random() * 360;

        const animation = particle.animate([
            { transform: `translate(0, 0) rotate(0deg) scale(1)`, opacity: 1 },
            { transform: `translate(${destX}px, ${destY}px) rotate(${rotate}deg) scale(0)`, opacity: 0 }
        ], {
            duration: 700,
            easing: 'ease-out'
        });

        animation.onfinish = () => particle.remove();
    }
}

function takeDamage(amount) {
    health -= amount;
    if(health < 0) health = 0;
    healthEl.innerText = health;
    
    
    gameArea.style.boxShadow = "inset 0 0 100px red";
    setTimeout(() => gameArea.style.boxShadow = "none", 200);

    if (health <= 0) endGame();
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(spawnInterval);
    gameOverScreen.classList.remove('hidden');
    finalScoreEl.innerText = score;
}

function restartGame() {
    startGame();
}