"use strict";

const canvas = document.getElementById("gameBoard");
var ctx = canvas.getContext("2d");

function init() {

    canvas.width = 800;
    canvas.height = 600;

    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

init();

function drawCircle(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
}

function drawBalls() {
    // fill canvas with balls
    for (var i = 0; i < 10; i++) {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        var radius = Math.random() * 30;
        var color = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
        drawCircle(x, y, radius, color)
    }
}

drawBalls();

