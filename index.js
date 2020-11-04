const playArea = document.getElementById('playArea');
const scoreDisplay = document.getElementById('score');
const speedDisplay = document.getElementById('speed');
const lengthDisplay = document.getElementById('length');

const currentSnake = [2, 1, 0];
let direction = 1;
const squares = [];
const width = 40;
let pDirection = 1;
let applePosition = -1;
let speed = 500;
let score = 0;

(function() {
    for (let i = 0; i < width ** 2; i++) {
        const square = document.createElement('div');
        square.className = 'square';
        // square.textContent = i;
        playArea.appendChild(square);
        squares.push(square)
    }
})();

currentSnake.forEach((e, i) => {
    if (i === 0) {
        squares[e].classList.add('head');
    } else {
        squares[e].classList.add('snake');
    }
});

const timerId = setInterval(move, speed);


function generateApple() {
    do {
        applePosition = Math.floor(Math.random() * (width ** 2));
    } while (squares[applePosition].classList.contains('snake') || squares[applePosition].classList.contains('head'));
    squares[applePosition].classList.add('apple');
}
generateApple();

function move() {
    console.log('abhishek')
    if ((currentSnake[0] + width >= width ** 2 && direction === width) || // down
        (currentSnake[0] - width < 0 && direction === -width) || // up
        (currentSnake[0] % width === 0 && direction === -1) || // left
        (currentSnake[0] % width === width - 1 && direction === 1) || // right
        (squares[currentSnake[0]].classList.contains('snake'))
    ) {
        console.log(currentSnake[0] + width, direction, timerId);
        return clearInterval(timerId);
    }

    const tail = currentSnake.pop();
    squares[tail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0] + direction);
    if (currentSnake[0] === applePosition) {
        squares[applePosition].classList.remove('apple');
        currentSnake.push(tail);
        squares[tail].classList.add('snake');
        lengthDisplay.textContent = currentSnake.length;
        score++;
        scoreDisplay.textContent = score;
        generateApple();
        speed--;
        speedDisplay.textContent = 501 - speed;

    }
    squares[currentSnake[1]].classList.remove('head');
    squares[currentSnake[1]].classList.add('snake');
    squares[currentSnake[0]].classList.add('head');

}



// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow
const changeDirection = (e) => {
    // pDirection = direction;
    if (e.keyCode === 37 && direction !== 1) {
        console.log('left direction');
        direction = -1;
    } else if (e.keyCode === 38 && direction !== width) {
        console.log('up direction');
        direction = -width;
    } else if (e.keyCode === 39 && direction !== -1) {
        console.log('right direction');
        direction = 1;
    } else if (e.keyCode === 40 && direction !== -width) {
        console.log('down direction');
        direction = width;
    }
}

document.addEventListener('keyup', changeDirection);