import { Ball } from './balls.js';
export class Game {
    // #ecf0f1 #95a5a6 #2c3e50 #3498db #2980b9 #2c3e50
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.balls = [];
        this.draggingBall = null;
        this.originalBall = null;
        this.padding = 30;
        this.ballSize = 20;
        this.ballSpacing = this.ballSize + 5;
        this.colors = ['#7f8c8d', '#3498db', '#e74c3c'];
        this.canvas.style.cursor = 'grab';
        this.witdh = this.canvas.width;
        this.height = this.canvas.height;
        let ballsPerRow = Math.floor((this.witdh - this.padding * 2) / (this.ballSize + (this.ballSpacing))) + 1;
        let ballsPerColumn = Math.floor((this.height - this.padding * 2) / (this.ballSize + this.ballSpacing)) + 1;
        const randomColor = () => { return this.colors[Math.floor(Math.random() * this.colors.length)]; };
        let x = this.padding;
        let y = this.padding;
        for (let i = 0; i < ballsPerColumn; i++) {
            let row = [];
            for (let j = 0; j < ballsPerRow; j++) {
                row.push(new Ball(x, y, this.ballSize, randomColor()));
                x += this.ballSize + this.ballSpacing;
            }
            this.balls.push(row);
            x = this.padding;
            y += this.ballSize + this.ballSpacing;
        }
        this.canvas.addEventListener('mousedown', (event) => { this.onPressHandle(event); });
        this.canvas.addEventListener('touchstart', (event) => { this.onPressHandle(event); });
        this.canvas.addEventListener('mousemove', (event) => { this.onMoveHandle(event); });
        this.canvas.addEventListener('touchmove', (event) => { this.onMoveHandle(event); });
        this.canvas.addEventListener('mouseup', (event) => { this.onReleaseHandle(event); });
        this.canvas.addEventListener('touchend', (event) => { this.onReleaseHandle(event); });
        this.updateBoard();
    }
    getBallAt(x, y) {
        const distance = (x, y, ball) => { return Math.sqrt(Math.pow(x - ball.x, 2) + Math.pow(y - ball.y, 2)); };
        let foundBall = null;
        this.balls.forEach((row) => {
            row.forEach((ball) => {
                if (distance(x, y, ball) < this.ballSize) {
                    foundBall = ball;
                }
            });
        });
        if (foundBall == null) {
            //throw new Error('no ball found');
        }
        return foundBall;
    }
    updateBoard() {
        this.context.fillStyle = '#2c3e50';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.balls.forEach((row) => {
            row.forEach((ball) => {
                ball.draw(this.canvas, this.context);
            });
        });
    }
    findMatches() {
        let matches = [];
        this.balls.forEach((row) => {
            let match = [];
            row.forEach((ball) => {
                if (match.length === 0) {
                    match.push(ball);
                }
                else if (ball.color === match[0].color) {
                    match.push(ball);
                }
                else {
                    if (match.length >= 3) {
                        matches.push(match);
                    }
                    match = [ball];
                }
            });
            if (match.length >= 3) {
                matches.push(match);
            }
        });
        return matches;
    }
    onPressHandle(event) {
        if (event instanceof MouseEvent)
            this.canvas.style.cursor = 'grabbing';
        let coord = this.getCoordFromEvent(event);
        let ball = this.getBallAt(coord.x, coord.y);
        if (ball != null) {
            this.originalBall = ball.clone();
            ball.color = '#ecf0f1';
            this.draggingBall = ball;
        }
        /*
        try {
                let ball = this.getBallAt(x, y);
                let matches = this.findMatches();
                if (matches.length > 0) {
                        matches.forEach((match) => {
                                match.forEach((ball) => {
                                        ball.color = '#ecf0f1';
                                });
                        });
                } else {
                        ball.color = '#ecf0f1';
                }
                this.updateBoard();
        } catch (error) {
                console.log(error);
        }
        */
    }
    onMoveHandle(event) {
        if (event instanceof MouseEvent) {
            if (event.buttons === 0) {
                return;
            }
            else if (event.buttons === 1) {
                this.canvas.style.cursor = 'grabbing';
            }
        }
        if (this.draggingBall != null) {
            let coord = this.getCoordFromEvent(event);
            this.draggingBall.move(coord.x, coord.y);
            this.updateBoard();
        }
    }
    onReleaseHandle(event) {
        if (this.draggingBall != null) {
            if (event instanceof MouseEvent)
                this.canvas.style.cursor = 'grab';
            let coord = this.getCoordFromEvent(event);
            let ball = this.getBallAt(coord.x, coord.y);
            if (ball != null) {
                this.draggingBall.move(ball.x, ball.y);
                ball.move(this.originalBall.x, this.originalBall.y);
            }
            else {
                this.draggingBall.move(this.originalBall.x, this.originalBall.y);
            }
            this.draggingBall = null;
            this.originalBall = null;
            this.updateBoard();
        }
    }
    getCoordFromEvent(event) {
        let x;
        let y;
        if (event instanceof MouseEvent) {
            x = event.clientX;
            y = event.clientY;
        }
        else {
            if (event.touches.length == 0) {
                x = event.changedTouches[0].clientX;
                y = event.changedTouches[0].clientY;
            }
            else {
                x = event.touches[0].clientX;
                y = event.touches[0].clientY;
            }
        }
        let rect = this.canvas.getBoundingClientRect();
        x -= rect.left;
        y -= rect.top;
        return { x, y };
    }
}
