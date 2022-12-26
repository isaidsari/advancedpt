


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

/*
    canvas.addEventListener('click', function (event) {
        var x = event.pageX - canvas.offsetLeft;
        var y = event.pageY - canvas.offsetTop;
        console.log('x: ' + x + ' y: ' + y);
        
        // find the ball that was clicked in radius
        var ball = balls.find(ball => {
            return ball.x - ball.radius < x && ball.x + ball.radius > x && ball.y - ball.radius < y && ball.y + ball.radius > y;
        });
        if (ball) {
            ball.color = 'green';
            ball.draw();
        }
    });*/


    //sw
    /*
addEventListener('refresh', function (e) {
    console.log(CACHE, e);
    e.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(keys
                .filter(function (key) { return key !== CACHE; })
                .map(function (key) { return caches["delete"](key); })
            );
        }
        )
    );
});*/