const canvas = document.getElementById("canvas");
const image = document.getElementById("image");
const ctx = canvas.getContext("2d");

//Fill Rect
// ctx.fillStyle = "green";
// ctx.fillRect(canvas.width / 2, canvas.height / 2, 80, 80);
// ctx.strokeStyle = "red";
// ctx.lineWidth = 20;
// ctx.strokeRect(canvas.width / 3, canvas.height / 3, 80, 80);
// ctx.stroke();

// ctx.clearRect(canvas.width / 1.96, canvas.height / 1.96, 70, 70);

//paths

// ctx.beginPath();
// ctx.moveTo(20, 20);
// ctx.lineTo(100, 20);
// ctx.lineTo(60, 70);
// ctx.closePath();
// ctx.fillStyle = "red";
// ctx.fill();

//Emoji

// const centerX = canvas.width / 2;
// const centerY = canvas.height / 2;
// ctx.arc(centerX, centerY, 200, 0, Math.PI * 2, true);
// ctx.moveTo(centerX + 100, centerY);
// ctx.fillStyle = "white";
// ctx.fill();
// ctx.arc(centerX, centerY, 100, 0, Math.PI, false);
// ctx.moveTo(centerX - 70, centerY - 80);
// ctx.fillStyle = "black";
// ctx.fill();
// ctx.arc(centerX - 90, centerY - 80, 20, 0, Math.PI * 2, false);
// ctx.moveTo(centerX + 100, centerY - 80);
// ctx.fillStyle = "black";
// ctx.fill();
// ctx.arc(centerX + 80, centerY - 80, 20, 0, Math.PI * 2, false);
// ctx.moveTo(centerX, centerY - 50);
// ctx.fillStyle = "yellow";
// ctx.fill();
// ctx.lineTo(centerX + 20, centerY - 30);
// ctx.lineTo(centerX - 20, centerY - 30);
// ctx.closePath();
// ctx.stroke();
const circle = {
  x: 200,
  y: 100,
  size: 20,
  dx: 5,
  dy: 4
};
drawCircle = () => {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2, true);
  ctx.fillStyle = "red";
  ctx.fill();
};

update = () => {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
  drawCircle();
  circle.x += circle.dx;
  circle.y += circle.dy;

  if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
    circle.dx *= -1;
  }
  if (circle.y + circle.size > canvas.height || circle.y - circle.size < 0) {
    circle.dy *= -1;
  }

  requestAnimationFrame(update);
};
update();
const player = {
  w: 40,
  h: 50,
  x: 20,
  y: 200,
  speed: 10,
  dx: 0,
  dy: 0
};
clear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};
drawPlayer = () => {
  ctx.drawImage(image, player.x, player.y, player.w, player.h);
};
changePos = () => {
  player.x += player.dx;
  player.y += player.dy;
  detectWalls();
};
detectWalls = () => {
  if (player.x < 0) {
    player.x = 0;
  } else if (player.x + player.w > canvas.width) {
    player.x = canvas.width - player.w;
  } else if (player.y + player.h > canvas.height) {
    player.y = canvas.height - player.h;
  } else if (player.y < 0) {
    player.y = 0;
  }
};
keyDown = e => {
  console.log(e.key);
  const key = e.key;

  if (key === "ArrowRight") {
    player.dx = player.speed;
  } else if (key === "ArrowLeft") {
    player.dx = -player.speed;
  } else if (key === "ArrowUp") {
    player.dy = -player.speed;
  } else if (key === "ArrowDown") {
    player.dy = player.speed;
  }
};
keyUp = e => {
  if (
    e.key === "ArrowRight" ||
    e.key === "ArrowUp" ||
    e.key === "ArrowDown" ||
    e.key === "ArrowLeft"
  ) {
    player.dx = 0;
    player.dy = 0;
  }
};
update2 = () => {
  clear();
  drawPlayer();
  changePos();
  requestAnimationFrame(update);
};
update2();

document.body.addEventListener("keydown", keyDown);
document.body.addEventListener("keyup", keyUp);
