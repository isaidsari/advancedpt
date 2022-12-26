const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");

export class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 5;
    }

    move(x, y) {
        console.log('moving -> x: ' + x + ' y: ' + y);
        this.x = x;
        this.y = y;
        this.draw();
    }
    

}
