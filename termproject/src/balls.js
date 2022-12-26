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
        Ball.balls.push(this);
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
        console.log('moving -> x: ' + x + ' y: ' + y);
        this.x = x;
        this.y = y;
        this.draw();
    }

    swap(ball) {
        if (!this.canSwap(ball)) {
            return;
        }
        var temp = this.copy();
        this.move(ball.x, ball.y);
        ball.move(temp.x, temp.y);
        console.log('swapped');
    }

    copy() {
        return new Ball(this.x, this.y, this.radius, this.color);
    }

    canSwap(ball) {
        // check if ball is in range of 2 radius
        var distance = Math.sqrt(Math.pow(this.x - ball.x, 2) + Math.pow(this.y - ball.y, 2));
        return distance <= this.radius * 2;
    }

    static getBallat(x, y) {
        return Ball.balls.find(ball => ball.x == x && ball.y == y);
    }

}
