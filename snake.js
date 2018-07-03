const frameRate = 15;

const width = 20;
const height = 20;

var xvel = 1;
var yvel = 0;

var snake;
var food;
var score;

window.onload = function() {
  canvas = document.getElementById("snake");
  ctx = canvas.getContext("2d");
  restart();
  document.addEventListener("keydown", keyPressed);
  setInterval(game, 1000/frameRate);
}

function restart() {
  snake = initializeSnake(1);
  food = createFood();
  score = 0;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function game() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  renderFood();
  renderSnake();

  let head = snake[0];

  for (let s = 1; s < snake.length; s++) {
    if (head.x === snake[s].x && head.y === snake[s].y) {
      restart();
    }
  }

  if (head.x === food.x && head.y === food.y) {
    document.getElementById("score").innerHTML = "Score: " + ++score;
    food = createFood();
    moveSnake(true);
  } else {
    moveSnake(false);
  }
}

function renderSnake() {
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === food.x && snake[i].y === food.y) {
      renderTile(snake[i], "#800000");
    } else {
      renderTile(snake[i], "black");
    }
  }
}

function renderFood() {
  renderTile(food, "red");
}

function renderTile(pos, color) {
  ctx.fillStyle = color;
  ctx.fillRect(mod(pos.x, width) * (canvas.width / width),
                mod(pos.y, height) * (canvas.height / height),
                canvas.width / width,
                canvas.height / height);
}

function moveSnake(growSnake) {
  const head = snake[0];
  if (!growSnake) {
    snake.pop();
  }
  snake.unshift({ x: mod(head.x + xvel, width), y: mod(head.y + yvel, height) });
}

function initializeSnake(length) {
  let snake = [];
  let x = width/2;
  let y = height/2;
  for (let i = 0; i < length; i++) {
    snake.push({ x: x - i, y: y });
  }

  return snake;
}

function createFood() {
  return { x: randomInt(width), y: randomInt(height) };
}

function randomInt(n) {
  return Math.floor(Math.random() * n);
}

function keyPressed(event) {
  switch(event.keyCode) {
    case 37: // left
      if (xvel != 1) {
        xvel = -1;
        yvel = 0;
      }
      break;
    case 38: // up
      if (yvel != 1) {
        xvel = 0;
        yvel = -1;
      }
      break;
    case 39: // right
      if (xvel != -1) {
        xvel = 1;
        yvel = 0;
      }
      break;
    case 40: // down
      if (yvel != -1) {
        xvel = 0;
        yvel = 1;
      }
      break;
  }
}

function mod(n, m) {
  return ((n % m) + m) % m;
}
