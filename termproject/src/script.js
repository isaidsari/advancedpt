const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");
var width;
var height;

function init() {
    width = Number(canvas.scrollWidth);
    height = Number(canvas.scrollHeight);
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0, 0, width, height);
    // add event listener for mouse click
    canvas.addEventListener('click', function (event) {
        var x = event.pageX - canvas.offsetLeft;
        var y = event.pageY - canvas.offsetTop;
        var radius = Math.random() * 30;
        var color = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';

        drawCircle(x,y,radius,color);
        // print position of mouse click
        console.log('x: ' + x + ' y: ' + y);
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

    // draw candy crush like balls
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
}

init();
drawBalls();

