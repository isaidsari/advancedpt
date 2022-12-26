const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

class Ball {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

const ball = new Ball(100, 100, 50, 'red');

ball.draw(ctx);

