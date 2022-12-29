const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");

export class Ball {

    static padding = 10;
    static radius = 20;

    static width = canvas.width;
    static height = canvas.height;

    static colors = ['#7f8c8d', '#3498db', '#e74c3c']; // #ecf0f1 #95a5a6 #2c3e50 #3498db #2980b9 #2c3e50

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

        ctx.font = "20px monospace";
        ctx.fillStyle = "black";
        ctx.fillText(Ball.balls.indexOf(this), this.x - 10, this.y + 6);
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
            
            let body = document.getElementsByTagName('body')[0];
            body.style.backgroundColor = 'red';
            setTimeout(() => {
                body.style.backgroundColor = 'white';
            }, 100);
            
            return;
        }
        var temp = this.copy();
        this.move(ball.x, ball.y);
        ball.move(temp.x, temp.y);
        console.log('swapped ' + Ball.balls.indexOf(this) + ' with ' + Ball.balls.indexOf(ball));
    }

    copy() {
        return new Ball(this.x, this.y, this.radius, this.color);
    }

    canSwap(ball) {
        // this shouldnt be here
        let padding = 10;
        if (this.x != ball.x && this.y != ball.y) {
            return false;
        }
        if (this == ball) {
            return false;
        }
        let distance = Math.sqrt(Math.pow(this.x - ball.x, 2) + Math.pow(this.y - ball.y, 2));
        if (distance > this.radius + ball.radius + padding) 
        {
            return false;
        }
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
        var width = this.width;
        var height = this.height;
        var padding = Ball.padding;
        var radius = Ball.radius;
        var x = radius + padding;
        var y = radius + padding;
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

        let color;
        for (var i = 0; i < ballCountTotal; i++) {
            color = this.colors[Math.floor(Math.random() * this.colors.length)];
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
        this.findMatches();
    }

    static findMatches() {
        var padding = Ball.padding;
        var radius = Ball.radius;
        var ballWidth = radius * 2;
        let width = Math.floor(380 / (ballWidth + padding));
        console.log('find match f(): width: ' + width);

        let getBallPosition = (ball) => Ball.balls.indexOf(ball);

        for (const ball of Ball.balls) {
            const pos = getBallPosition(ball);

            // Check left, right, top, and bottom of current ball
            const left = Ball.balls[pos - 1];
            const right = Ball.balls[pos + 1];
            const top = Ball.balls[pos - width];
            const bottom = Ball.balls[pos + width];

            // print ball index with its neighbors
            //console.log('ball: ' + pos + ' left: ' + (left ? getBallPosition(left) : 'null') + ' right: ' + (right ? getBallPosition(right) : 'null') + ' top: ' + (top ? getBallPosition(top) : 'null') + ' bottom: ' + (bottom ? getBallPosition(bottom) : 'null'));

            if (
                left &&
                left.color === ball.color &&
                right &&
                right.color === ball.color
            ) {
                if (pos % width == 0 || pos % width == width - 1) {
                    // if ball is on the edge of the board, dont check for matches
                    continue;
                }

                // Mark left, current, and right balls as a match
                left.match = true;
                ball.match = true;
                right.match = true;
                // draw line
                // if matchs direction is horizontal make its color lime
                ctx.strokeStyle = 'lime';
                ctx.beginPath();
                ctx.moveTo(left.x, left.y);
                ctx.lineTo(right.x, right.y);
                ctx.stroke();
            }

            if (
                top &&
                top.color === ball.color &&
                bottom &&
                bottom.color === ball.color
            ) {

                // Mark top, current, and bottom balls as a match
                top.match = true;
                ball.match = true;
                bottom.match = true;
                // draw line
                // if matchs direction is vertical make its color purple
                ctx.strokeStyle = 'purple';
                ctx.beginPath();
                ctx.moveTo(top.x, top.y);
                ctx.lineTo(bottom.x, bottom.y);
                ctx.stroke();
            }
        }
    }

}
