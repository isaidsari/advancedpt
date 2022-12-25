const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");

import { Ball } from './balls.js';

var width;
var height;

// ball matrix
var ballMatrix = [];

// global chosen ball
var chosenBall;

var isDragging = false;

function drawBalls() {

    // draw candy crush like balls
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

    // clear canvas
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0, 0, width, height);


    for (var i = 0; i < ballCountTotal; i++) {
        var ball = new Ball(x, y, radius, color);
        ball.draw();
        ballMatrix.push(ball);
        x += ballWidth + padding;
        ballCount++;

        if (ballCount == ballCountPerRow) {
            x = radius + padding;
            y += ballHeight + padding;
            ballCount = 0;
        }
    }


}

function init() {
    width = Number(canvas.scrollWidth);
    height = Number(canvas.scrollHeight);
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0, 0, width, height);
    // add event listener for mouse click
    /*
    canvas.addEventListener('click', function (event) {
        var x = event.pageX - canvas.offsetLeft;
        var y = event.pageY - canvas.offsetTop;
        console.log('x: ' + x + ' y: ' + y);
        
        // find the ball that was clicked in radius
        var ball = ballMatrix.find(ball => {
            return ball.x - ball.radius < x && ball.x + ball.radius > x && ball.y - ball.radius < y && ball.y + ball.radius > y;
        });
        if (ball) {
            ball.color = 'green';
            ball.draw();
        }
    });*/

    // add event listener for dragging
    canvas.addEventListener('mousedown', function (event) {
        var x = event.pageX - canvas.offsetLeft;
        var y = event.pageY - canvas.offsetTop;

         
        // find the ball that was clicked in radius
        var ball = ballMatrix.find(ball => {
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

    canvas.addEventListener('mousemove', function (event) {
        var x = event.pageX - canvas.offsetLeft;
        var y = event.pageY - canvas.offsetTop;

        isDragging = true;

        // check if ball is chosen and mouse is clicked

        if (chosenBall && event.buttons == 1) {
            // delete old ball
            ballMatrix = ballMatrix.filter(ball => ball != chosenBall);
            // draw new ball
            chosenBall = new Ball(x, y, chosenBall.radius, chosenBall.color);
            ballMatrix.push(chosenBall);
            drawBalls();
            chosenBall.draw();
        }
    });

    canvas.addEventListener('mouseup', function (event) {
        var x = event.pageX - canvas.offsetLeft;
        var y = event.pageY - canvas.offsetTop;

        isDragging = false;

        // check if ball is chosen and mouse is clicked
        if (chosenBall) {
            // delete old ball
            ballMatrix = ballMatrix.filter(ball => ball != chosenBall);
            // draw new ball
            chosenBall = new Ball(x, y, chosenBall.radius, chosenBall.color);
            ballMatrix.push(chosenBall);
            drawBalls();
            chosenBall.draw();
        }
    });

    // make draggable for mobile
    canvas.addEventListener('touchstart', function (event) {
        var x = event.touches[0].clientX - canvas.offsetLeft;
        var y = event.touches[0].clientY - canvas.offsetTop;

        // find the ball that was clicked in radius
        var ball = ballMatrix.find(ball => {
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
        var x = event.touches[0].clientX - canvas.offsetLeft;
        var y = event.touches[0].clientY - canvas.offsetTop;

        isDragging = true;

        // check if ball is chosen and mouse is clicked

        if (chosenBall) {
            // delete old ball
            ballMatrix = ballMatrix.filter(ball => ball != chosenBall);
            // draw new ball
            chosenBall = new Ball(x, y, chosenBall.radius, chosenBall.color);
            ballMatrix.push(chosenBall);
            drawBalls();
            chosenBall.draw();
        }
    });

    canvas.addEventListener('touchend', function (event) {
        var x = event.touches[0].clientX - canvas.offsetLeft;
        var y = event.touches[0].clientY - canvas.offsetTop;

        isDragging = false;

        // check if ball is chosen and mouse is clicked
        if (chosenBall) {
            // delete old ball
            ballMatrix = ballMatrix.filter(ball => ball != chosenBall);
            // draw new ball

            chosenBall = new Ball(x, y, chosenBall.radius, chosenBall.color);
            ballMatrix.push(chosenBall);
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

function onCanvas(event) {
    console.log('onCanvas')
}

function drawCircle(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
}


document.addEventListener('DOMContentLoaded', () => {
    init();
    drawBalls();
});



    /*
        var padding = 10;
        var radius = 20;
        var x = radius + padding;
        var y = radius + padding;
        var color = 'red';
        var ballWidth = radius * 2;
        var ballHeight = radius * 2;
        var ballCount = 0;
        var ballCountPerRow = Math.floor(width / ballWidth);
        var ballCountPerColumn = Math.floor(height / ballHeight);
        var ballCountTotal = ballCountPerRow * ballCountPerColumn;
    
        for (var i = 0; i < ballCountTotal; i++) {
            drawCircle(x, y, radius, color);
            x += ballWidth;
            ballCount++;
    
            if (ballCount == ballCountPerRow) {
                x = radius + padding;
                y += ballHeight;
                ballCount = 0;
            }
        }
        */

    /*
    for (var i = 0; i < 10; i++) {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        var radius = Math.random() * 30;
        var color = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
        drawCircle(x, y, radius, color)
    }
    */
