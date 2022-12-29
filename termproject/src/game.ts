import { Ball } from './balls.js';

export class Game {

        private balls: Ball[][] = [];

        private draggingBall: Ball = null;
        private originalBall: Ball = null;

        private witdh: number;
        private height: number;

        private padding: number = 30;
        private ballSize: number = 20;
        private ballSpacing: number = this.ballSize + 5;

        private colors: string[] = ['#7f8c8d', '#3498db', '#e74c3c'];
        // #ecf0f1 #95a5a6 #2c3e50 #3498db #2980b9 #2c3e50

        constructor(
                private canvas: HTMLCanvasElement,
                private context: CanvasRenderingContext2D) {

                this.canvas.style.cursor = 'grab';

                this.witdh = this.canvas.width;
                this.height = this.canvas.height;

                let ballsPerRow = Math.floor((this.witdh - this.padding * 2) / (this.ballSize + (this.ballSpacing))) + 1;
                let ballsPerColumn = Math.floor((this.height - this.padding * 2) / (this.ballSize + this.ballSpacing)) + 1;

                const randomColor = (): string => { return this.colors[Math.floor(Math.random() * this.colors.length)] };

                let x = this.padding;
                let y = this.padding;

                for (let i = 0; i < ballsPerColumn; i++) {
                        let row: Ball[] = [];
                        for (let j = 0; j < ballsPerRow; j++) {
                                row.push(new Ball(x, y, this.ballSize, randomColor()));
                                x += this.ballSize + this.ballSpacing;
                        }
                        this.balls.push(row);
                        x = this.padding;
                        y += this.ballSize + this.ballSpacing;
                }

                this.canvas.addEventListener('mousedown', (event) => { this.onPressHandle(event) });
                this.canvas.addEventListener('touchstart', (event) => { this.onPressHandle(event) });

                this.canvas.addEventListener('mousemove', (event) => { this.onMoveHandle(event) });
                this.canvas.addEventListener('touchmove', (event) => { this.onMoveHandle(event) });

                this.canvas.addEventListener('mouseup', (event) => { this.onReleaseHandle(event) });
                this.canvas.addEventListener('touchend', (event) => { this.onReleaseHandle(event) });

                this.updateBoard();
        }

        public getBallAt(x: number, y: number): Ball {
                const distance = (x: number, y: number, ball: Ball): number => { return Math.sqrt(Math.pow(x - ball.x, 2) + Math.pow(y - ball.y, 2)) };

                let foundBall: Ball = null;
                this.balls.forEach((row) => {
                        row.forEach((ball) => {
                                if (distance(x, y, ball) < this.ballSize && ball != this.draggingBall) {
                                        foundBall = ball;
                                }
                        });
                });
                if (foundBall == null) {
                        //throw new Error('no ball found');
                }
                return foundBall;
        }

        public updateBoard(): void {
                this.context.fillStyle = '#2c3e50';
                this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

                this.balls.forEach((row) => {
                        row.forEach((ball) => {
                                ball.draw(this.canvas, this.context);
                        });
                });

                let matches = this.findMatches();
                if (matches.length > 0) {
                        matches.forEach((match) => {
                                this.context.beginPath();
                                this.context.moveTo(match[0].x, match[0].y);
                                match.forEach((ball) => {
                                        this.context.lineTo(ball.x, ball.y);
                                });
                                this.context.strokeStyle = '#ecf0f1';
                                this.context.stroke();
                        });
                }

                matches.forEach((match) => {
                        match.forEach((ball) => {
                                this.balls.forEach((row) => {
                                        row.forEach((column) => {
                                                if (column == ball) {
                                                        // row.splice(row.indexOf(column), 1);
                                                        row[row.indexOf(column)] = new Ball(column.x, column.y, this.ballSize, "transparent");
                                                }
                                        });
                                });
                        });
                });

                this.fillBoard();
        }

        public fillBoard(): void {
                // start from the top and if the bottom is empty, move the ball down with an animation
                setTimeout(() => {
                        this.balls.forEach((row) => {
                                row.forEach((ball) => {
                                        if (ball.color == 'transparent') {
                                                let index = row.indexOf(ball);
                                                let ballAbove = row[index - 1];
                                                if (ballAbove != null) {
                                                        row[index] = ballAbove;
                                                        row[index - 1] = null;
                                                }
                                        }
                                });
                        });
                }, 1000);


                setTimeout(() => {// if the top row is empty, create a new ball
                        this.balls.forEach((row) => {
                                row.forEach((ball) => {
                                        if (ball.color == 'transparent') {
                                                let index = row.indexOf(ball);
                                                row[index] = new Ball(row[index].x, row[index].y, this.ballSize, this.colors[Math.floor(Math.random() * this.colors.length)]);
                                        }
                                });
                        });
                }, 1000);

                this.updateBoard();


        }

        public findMatches(): Ball[][] {
                let matches: Ball[][] = [];
                this.balls.forEach((row) => {
                        let match: Ball[] = [];
                        row.forEach((ball) => {
                                if (match.length == 0) {
                                        match.push(ball);
                                } else if (match[0].color == ball.color) {
                                        match.push(ball);
                                } else {
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
                const getColumnIndex = (ball: Ball): number => {
                        let index: number = null;
                        this.balls.forEach((row) => {
                                row.forEach((column) => {
                                        if (column == ball) {
                                                index = row.indexOf(column);
                                        }
                                });
                        });
                        return index;
                };
                this.balls[0].forEach((column) => {
                        let match: Ball[] = [];
                        this.balls.forEach((row) => {
                                if (match.length == 0) {
                                        match.push(row[getColumnIndex(column)]);
                                } else if (match[0].color == row[getColumnIndex(column)].color) {
                                        match.push(row[getColumnIndex(column)]);
                                } else {
                                        if (match.length >= 3) {
                                                matches.push(match);
                                        }
                                        match = [row[getColumnIndex(column)]];
                                }
                        });
                        if (match.length >= 3) {
                                matches.push(match);
                        }
                }
                );
                return matches;
        }

        private onPressHandle(event: MouseEvent | TouchEvent): void {
                if (event instanceof MouseEvent)
                        this.canvas.style.cursor = 'grabbing';

                let coord: { x: number, y: number } = this.getCoordFromEvent(event);

                let ball = this.getBallAt(coord.x, coord.y);
                if (ball != null) {
                        this.originalBall = ball.clone();
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

        private onMoveHandle(event: MouseEvent | TouchEvent): void {
                if (event instanceof MouseEvent) {
                        if ((event as MouseEvent).buttons === 0) {
                                return;
                        } else if ((event as MouseEvent).buttons === 1) {
                                this.canvas.style.cursor = 'grabbing';
                        }
                }

                if (this.draggingBall != null) {
                        let coord: { x: number, y: number } = this.getCoordFromEvent(event);

                        this.draggingBall.move(coord.x, coord.y);

                        this.updateBoard();
                }
        }

        private onReleaseHandle(event: MouseEvent | TouchEvent): void {
                if (this.draggingBall != null) {
                        if (event instanceof MouseEvent)
                                this.canvas.style.cursor = 'grab';

                        let coord: { x: number, y: number } = this.getCoordFromEvent(event);

                        let ball = this.getBallAt(coord.x, coord.y);
                        if (this.originalBall.canSwap(ball)) {
                                this.draggingBall.move(this.originalBall.x, this.originalBall.y);
                                this.draggingBall.swap(ball);
                        } else {
                                this.draggingBall.move(this.originalBall.x, this.originalBall.y);
                        }

                        this.draggingBall = null;
                        this.originalBall = null;

                        this.updateBoard();
                }

        }

        private getCoordFromEvent(event: MouseEvent | TouchEvent): { x: number, y: number } {
                let x: number;
                let y: number;
                if (event instanceof MouseEvent) {
                        x = event.clientX;
                        y = event.clientY;
                } else {
                        if (event.touches.length == 0) {
                                x = event.changedTouches[0].clientX;
                                y = event.changedTouches[0].clientY;
                        } else {
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