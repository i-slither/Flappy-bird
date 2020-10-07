document.addEventListener('DOMContentLoaded', () => { // synchronously loading all the html and css than trigger the whole code. 
    const bird = document.querySelector('.bird');  
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');

    let birdLeft = 220; // horizontal position of the bird
    let birdBottom = 100; // verticle position of the bird 
    let gravity = 2; // the rate at which the bird will lose it's position
    let isGameOver = false; // boolean value for enabling certain conditions
    let gap = 430;
    function startGame() { // functions that invokes the loosing of position of the bird
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + "px";
        bird.style.left = birdLeft + "px";
    }

    let gameTimerId = setInterval(startGame, 20); // repeats the execution of the startGame function continuously

    function control(e) { // keycode function
        if (e.keyCode === 32) { // spacebar
            jump();
        }
    }

    function jump() { // function that adds 50px to the vertical position of the bird 
        if (birdBottom < 500) {
            birdBottom += 50;
        }
        bird.style.bottom = birdBottom + 'px';
        console.log(birdBottom);
    }

    document.addEventListener('keyup', control);// adding event whenever space is pressed

    function generateObstacle() {
        
        let obstacleLeft = 500;
        let topObstacleLeft = obstacleLeft;
        let randomHeight = Math.random() * 60;
        let obstacleBottom = randomHeight;
        
        console.log(`obstacleBot ${obstacleBottom}`);
        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');
        if (!isGameOver) {
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('top-obstacle');    
        }

        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle);
        obstacle.style.left = obstacleLeft + "px";
        obstacle.style.bottom = obstacleBottom + "px";
        topObstacle.style.left = topObstacleLeft + "px";
        topObstacle.style.bottom = obstacleBottom + gap + "px";
        

        function moveObstacle() {
            obstacleLeft -= 2;
            topObstacleLeft -=2;
            obstacle.style.left = obstacleLeft + "px";
            topObstacle.style.left = topObstacleLeft + "px";

            if (isGameOver) {
                clearInterval(timerId);
                
            }

            if (obstacleLeft === -60 && topObstacleLeft ===-60) {
                clearInterval(timerId);
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
            }
            
            if (obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -200) || (birdBottom === 0)) {
                gameOver();
                clearInterval(gameTimerId);
                clearInterval(timerId);
            }
            
        }
        let timerId = setInterval(moveObstacle, 20);
        if (!isGameOver) setTimeout(generateObstacle, 3000);
    }
    generateObstacle();

    function gameOver() {
        
        isGameOver = true;
        document.removeEventListener('keyup', control);
    }

});

