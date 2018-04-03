var canvas = document.getElementById('field');
var ctx = canvas.getContext("2d");

var paddleHeight=10;
var paddleWidth=75;
var paddleX = 325;
var paddleY = canvas.height-paddleHeight;

var ballRadius = 10;
var ballX = 375;
var ballY = 420;




var brickRowCount = 7;
var brickColumnCount = 9;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 2;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var directionX = Math.floor(Math.random()*5);
var directionY = -2;


controls();

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { ballX: 0, ballY: 0, status: 1 };
    }
}

// draw bricks
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "red";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
    //bounce off bricks
    function collisionDetection() {
        for(c=0; c<brickColumnCount; c++) {
            for(r=0; r<brickRowCount; r++) {
                var b = bricks[c][r];
                if(b.status === 1) {
                    if(ballX > b.x && ballX < b.x+brickWidth && ballY > b.y && ballY < b.y+brickHeight) {
                        directionY = -directionY;
                        b.status = 0;
                    }
                }
            }
        }
}


function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(paddleX);
    drawBricks();
    drawBall();
    collisionDetection();

    // move the ball
    ballX += directionX;
    ballY += directionY;


    if(ballX + directionX > canvas.width-ballRadius || ballX + directionX < ballRadius) {
        directionX = -directionX;
    } if(ballY + directionY < ballRadius) {
        directionY = -directionY;
    } else if(ballY + directionY > canvas.height-ballRadius) {
        if(ballX > paddleX && ballX < paddleX + paddleWidth) {
            directionY = -directionY;
        }
    }

    requestAnimationFrame(draw);
}

//draw the paddle.
function drawPaddle(paddleX){
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(paddleX, paddleY, paddleWidth , paddleHeight);
    ctx.closePath();
}

//draw the ball.
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, (ballY), 7, 0, Math.PI*2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}



//Move the paddle left/right.
function move(direction){
    if (direction == "left"){
        if(paddleX <= 670){
            paddleX = paddleX + 25;
        }
        ctx.clearRect(0, paddleY, 800, 100);
    }
    if (direction == "right"){
        if(paddleX >= 10){
            paddleX = paddleX - 25;
        }
        ctx.clearRect(0, paddleY, 800,100);
    }
    drawPaddle(paddleX);
}

// Move the paddle.
function controls(){
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 37 || event.keyCode == 65) {
            move("right");
        }
        else if(event.keyCode == 39 || event.keyCode == 68) {
            move("left");
        }
    });
}
setInterval(draw(), 10);