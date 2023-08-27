let h = window.innerHeight;
let w = window.innerWidth;
let playingFieldSize = 0;
let scoreField = document.getElementById("score");
let speedField = document.getElementById("speed");
let startButton = document.getElementById("startButton");
let endButton = document.getElementById("endButton");
let pauseButton = document.getElementById("pauseButton");
let playingField = document.getElementById("playingField");
let controlBoxSize = 170;
let body = document.getElementById("body");
let snakeDirection = []; //1: up, 2: right, 3: down, 4: left
let head = document.getElementById("head");
let body1 = document.getElementById("body1");
let body2 = document.getElementById("body2");
let body3 = document.getElementById("body3");
let body4 = document.getElementById("body4");
let gridSquareSize = 0;
let speed = "slow";
let score = 0;
let pauseClicked = false;
const speeds = new Map([
  ["slow", 1000],
  ["verySlow", 1500],
  ["medium", 500],
  ["fast", 200],
]);
let gameIntervalId = undefined;
let nextDirection = 1;
let directionChangedThisLoop = false;
let snake = [head, body1, body2, body3, body4];

window.addEventListener("resize", resizeWindow);
startButton.addEventListener("click", startGame);
endButton.addEventListener("click", endGame);
pauseButton.addEventListener("click", pauseGame);
document.addEventListener("keydown", checkDirection)

window.onload = function () {
  resizeWindow();
  endGame();
  speedField.value = "slow";
};

function checkDirection(e) {
    let key = e.key
    if (!directionChangedThisLoop){
        if (key === "a"){
            nextDirection -=1
            if (nextDirection ===0) {
                nextDirection = 4
            }
            directionChangedThisLoop = true
        } else if (key ==="d") {
            directionChangedThisLoop = true
            nextDirection += 1
            if (nextDirection === 5) {
                nextDirection = 1
            }
        }
    }
        
}
function startGame() {
  speed = speeds.get(speedField.value);
  gameIntervalId = setInterval(moveForward, speed);
  directionChangedThisLoop = false;

}
function moveForward() {
    // console.log("befor:", snakeDirection)
    let prevDir = nextDirection
    for (let i = 0; i < 5; i++) {
        let temp = snakeDirection[i]
        snakeDirection[i] =prevDir
        prevDir = temp
    }
    // console.log("after:", snakeDirection)

  if (!checkForCollision()){
  for (let i = 0; i < snake.length; i++) {
    let bodyPart = snake[i];
    let currX = +bodyPart.style.left.slice(0, -2);
    let currY = +bodyPart.style.top.slice(0, -2);
    let dir = snakeDirection[i];
    // console.log(dir);
    if (dir === 1) {
      let newY = currY - gridSquareSize;
      bodyPart.style.top = newY + "px";
    } else if (dir === 2) {
      let newX = currX + gridSquareSize;
      bodyPart.style.left = newX + "px";
    } else if (dir === 3) {
      let newY = currY + gridSquareSize;
      bodyPart.style.top = newY + "px";
    } else if (dir === 4) {
      let newX = currX - gridSquareSize;
      bodyPart.style.left = newX + "px";
    }
  }
  scoreField.innerHTML = score;
  score += 1;
  directionChangedThisLoop = false
}
}
function checkForCollision() {
  let head = snake[0];
  let headX = +head.style.left.slice(0, -2);
  let headY = +head.style.top.slice(0, -2);
  let headDir = snakeDirection[0];

  if (
    (headX <= 20.1 && headDir === 4) ||
    (headX >= gridSquareSize * 20 + 19.9 && headDir === 2) ||
    (headY <= 20.1 && headDir === 1) ||
    (headY >= gridSquareSize * 20 + 19.9 && headDir === 3)
  ) {
    borderCollision();
    pauseGame();
    return true;
  }
  let bodyPart = snake[3];
  let bodyPartX = +bodyPart.style.left.slice(0, -2);
  let bodyPartY = +bodyPart.style.top.slice(0, -2);
  
  console.log(headX - 1> bodyPartX && headX -gridSquareSize - 1 <= bodyPartX && headDir === 4)
  console.log(headX + 1 < bodyPartX && headX +gridSquareSize + 1 >= bodyPartX && headDir === 2)
  console.log(headY -1 < bodyPartY && headY +gridSquareSize + 1 >= bodyPartY && headDir === 3)
  console.log(headY,bodyPartY)
  console.log(headY - 1 > bodyPartY && headY -gridSquareSize - 1 <= bodyPartY && headDir === 1)
  if (
    (headX - 1> bodyPartX && headX -gridSquareSize - 1 <= bodyPartX && headDir === 4) ||
    (headX + 1< bodyPartX && headX +gridSquareSize + 1 >= bodyPartX && headDir === 2) ||
    (headY - 1< bodyPartY && headY +gridSquareSize + 1 >= bodyPartY && headDir === 3) ||
    (headY - 1> bodyPartY && headY -gridSquareSize - 1 <= bodyPartY && headDir === 1)
  ) {
    selfCollision();
    pauseGame();
    return true;
  }
   
  return false
}

function borderCollision() {
  playingField.style.borderColor = "yellow";
}
function selfCollision() {
    for (let i = 1; i < snake.length; i++){
        snake[i].style.backgroundColor = "yellow"
    }
}

function pauseGame() {
  clearInterval(gameIntervalId);
}

function endGame() {
  score = 0;
  clearInterval(gameIntervalId);
  scoreField.innerHTML = 0;
  snakeDirection = [1, 1, 1, 1, 1];
  nextDirection = 1
  directionChangedThisLoop = false;
  for (let i = 0; i < 5; i++) {
    let bodyPart = snake[i];
    let x = gridSquareSize * 10 + 20;
    let y = gridSquareSize * (10 + i) + 20;
    bodyPart.style.width = gridSquareSize + "px";
    bodyPart.style.height = gridSquareSize + "px";
    bodyPart.style.top = y + "px";
    bodyPart.style.left = x + "px";
    if (i >= 1) {
      bodyPart.style.backgroundColor = "red";
    }
    playingField.style.borderColor = "red";
  }
}

function resizeWindow() {
  h = window.innerHeight;
  w = window.innerWidth;
  let potentialWidth = w - controlBoxSize - 40;
  let playingFieldSize = h - 40;
  if (potentialWidth < playingFieldSize) {
    playingFieldSize = potentialWidth;
  }
  playingField.style.width = playingFieldSize + "px";
  playingField.style.height = playingFieldSize + "px";
  gridSquareSize = playingFieldSize / 21;
  endGame();
}
