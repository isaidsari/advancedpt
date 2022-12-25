import { Ball } from './balls.js';

const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");

var width;
var height;

var balls = [];

var chosenBall;

var isDragging = false;

function drawBalls() {
    var padding = 10;
    var radius = 20;
    var x = radius + padding;
    var y = radius + padding;
    var color = 'red';
    var ballWidth = radius * 2;
    var ballHeight = radius * 2;
    var ballCount = 0;
    var ballCountPerRow = Math.floor(width / (ballWidth + padding));
    var ballCountPerColumn = Math.floor(height / (ballHeight + padding));
    var ballCountTotal = ballCountPerRow * ballCountPerColumn;

    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0, 0, width, height);

    for (var i = 0; i < ballCountTotal; i++) {
        var ball = new Ball(x, y, radius, color);
        ball.draw();
        balls.push(ball);
        x += ballWidth + padding;
        ballCount++;

        if (ballCount == ballCountPerRow) {
            x = radius + padding;
            y += ballHeight + padding;
            ballCount = 0;
        }
    }
}

function onPress(x, y) {
    var ball = balls.find(ball => {
        return ball.x - ball.radius < x && ball.x + ball.radius > x && ball.y - ball.radius < y && ball.y + ball.radius > y;
    });
    if (ball) {
        chosenBall = ball;
        ball.color = 'green';
        ball.draw();
    } else {
        chosenBall = null;
    }
}

function onDrag(x, y) {
    isDragging = true;
    if (chosenBall) {
        // delete old ball
        balls = balls.filter(ball => ball != chosenBall);
        // draw new ball
        chosenBall = new Ball(x, y, chosenBall.radius, chosenBall.color);
        balls.push(chosenBall);
        drawBalls();
        chosenBall.draw();
    }
}

function init() {
    width = canvas.scrollWidth;
    height = canvas.scrollHeight;
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0, 0, width, height);

    canvas.addEventListener('mousedown', function (event) {
        var x = event.pageX - canvas.offsetLeft;
        var y = event.pageY - canvas.offsetTop;
        onPress(x, y);
    });

    canvas.addEventListener('mousemove', function (event) {
        var x = event.pageX - canvas.offsetLeft;
        var y = event.pageY - canvas.offsetTop;
        if (event.buttons != 1)
            return;
        onDrag(x, y);
    });

    canvas.addEventListener('mouseup', function (event) {
        var x = event.pageX - canvas.offsetLeft;
        var y = event.pageY - canvas.offsetTop;

        isDragging = false;

        // check if ball is chosen and mouse is clicked
        if (chosenBall) {
            // delete old ball
            balls = balls.filter(ball => ball != chosenBall);
            // draw new ball
            chosenBall = new Ball(x, y, chosenBall.radius, chosenBall.color);
            balls.push(chosenBall);
            drawBalls();
            chosenBall.draw();
        }
    });

    // make draggable for mobile
    canvas.addEventListener('touchstart', function (event) {
        // disable scrolling
        event.preventDefault();

        var x = event.touches[0].clientX - canvas.offsetLeft;
        var y = event.touches[0].clientY - canvas.offsetTop;

        // find the ball that was clicked in radius
        var ball = balls.find(ball => {
            return ball.x - ball.radius < x && ball.x + ball.radius > x && ball.y - ball.radius < y && ball.y + ball.radius > y;
        });
        if (ball) {
            chosenBall = ball;
            ball.color = 'green';
            ball.draw();
        } else {
            chosenBall = null;
        }

    });

    canvas.addEventListener('touchmove', function (event) {
        event.preventDefault();
        var x = event.touches[0].clientX - canvas.offsetLeft;
        var y = event.touches[0].clientY - canvas.offsetTop;

        isDragging = true;

        // check if ball is chosen and mouse is clicked

        if (chosenBall) {
            // delete old ball
            balls = balls.filter(ball => ball != chosenBall);
            // draw new ball
            chosenBall = new Ball(x, y, chosenBall.radius, chosenBall.color);
            balls.push(chosenBall);
            drawBalls();
            chosenBall.draw();
        }
    });

    canvas.addEventListener('touchend', function (event) {
        event.preventDefault();
        var x = event.touches[0].clientX - canvas.offsetLeft;
        var y = event.touches[0].clientY - canvas.offsetTop;

        isDragging = false;

        // check if ball is chosen and mouse is clicked
        if (chosenBall) {
            // delete old ball
            balls = balls.filter(ball => ball != chosenBall);
            // draw new ball

            chosenBall = new Ball(x, y, chosenBall.radius, chosenBall.color);
            balls.push(chosenBall);
            drawBalls();
            chosenBall.draw();
        }
    });




    // add event listener for mouse tracking
    canvas.addEventListener('mousemove', function (event) {
        var x = event.pageX - canvas.offsetLeft;
        var y = event.pageY - canvas.offsetTop;
        // print position of mouse click
        document.getElementById("posxy").innerHTML = 'x: ' + x + ' y: ' + y;
    });

    // add event listener for finger drag
    canvas.addEventListener('touchend', function (event) {
        var x = event.pageX - canvas.offsetLeft;
        var y = event.pageY - canvas.offsetTop;
        // print position of mouse click
        document.getElementById("posxy").innerHTML = 'x: ' + x + ' y: ' + y;
    });

};

document.addEventListener('DOMContentLoaded', () => {
    init();
    drawBalls();
});
