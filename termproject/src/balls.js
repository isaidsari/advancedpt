const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");

export class Ball {

    // static balls matrix
    static balls = [];

    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        //Ball.balls.push(this);
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 5;

        ctx.font = "10px sans-serif";
        ctx.fillStyle = "black";
        ctx.fillText(Ball.balls.indexOf(this), this.x - 5, this.y + 5);
    }

    move(x, y) {
        //console.log('moving -> x: ' + x + ' y: ' + y);
        this.x = x;
        this.y = y;
        this.draw();
    }

    swap(ball) {
        if (!ball) {
            // if there is no ball to swap dont swap put back its place
            console.log("no ball to swap");
            return;
        }
        if (!this.canSwap(ball)) {
            console.log('couldnt swap');
            return;
        }
        var temp = this.copy();
        this.move(ball.x, ball.y);
        ball.move(temp.x, temp.y);
        console.log('swapped '+Ball.balls.indexOf(this)+' with '+Ball.balls.indexOf(ball));
    }

    copy() {
        return new Ball(this.x, this.y, this.radius, this.color);
    }

    canSwap(ball) {
        return true;
    }

    static getBallat(x, y) {
        // make not point to point match
        //return Ball.balls.find(ball => ball.x == x && ball.y == y);
        return Ball.balls.find(ball => { 
            var distance = Math.sqrt(Math.pow(ball.x - x, 2) + Math.pow(ball.y - y, 2));
            return distance <= ball.radius;
        });
    }

    static drawBalls() {
        var padding = 10;
        var radius = 20;
        var x = radius + padding;
        var y = radius + padding;
        var color;
        var colors = ['red', 'yellow', 'orange'];
        var ballWidth = radius * 2;
        var ballHeight = radius * 2;
        var ballCount = 0;
        var ballCountPerRow = Math.floor(width / (ballWidth + padding));
        var ballCountPerColumn = Math.floor(height / (ballHeight + padding));
        var ballCountTotal = ballCountPerRow * ballCountPerColumn;
    
        ctx.fillStyle = 'lightblue';
        ctx.fillRect(0, 0, width, height);
    
    
        if (Ball.balls.length > 0) {
            // if balls are already created, draw them
            Ball.balls.forEach(ball => {
                ball.draw();
            });
            return;
        }
    
        for (var i = 0; i < ballCountTotal; i++) {
            color = colors[Math.floor(Math.random() * colors.length)];
            var ball = new Ball(x, y, radius, color);
            Ball.balls.push(ball);
    
            ball.draw();
            Ball.balls.push(ball);
            x += ballWidth + padding;
            ballCount++;
    
            if (ballCount == ballCountPerRow) {
                x = radius + padding;
                y += ballHeight + padding;
                ballCount = 0;
            }
        }
    }

    static checkMatches() {
        // check if there is any match more than 3
    }

}
