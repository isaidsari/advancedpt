export class Ball {

        constructor(
                public x: number,
                public y: number,
                public radius: number,
                public color: string) {
        }

        public draw(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void {
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                context.fillStyle = this.color;
                context.shadowColor = this.color;
                context.shadowBlur = 10;
                context.fill();
        
        }

        public move(x: number, y: number): void {
                this.x = x;
                this.y = y;
        }

        private canSwap(ball: Ball): boolean {
                if (ball == null) {
                        return false;
                }
                if (this === ball) {
                        return false;
                }
                if (!(this.x === ball.x || this.y === ball.y)) {
                        return false;
                }
                let dx = this.x - ball.x;
                let dy = this.y - ball.y;
                let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                return distance < this.radius + ball.radius;
        }

        public swap(ball: Ball): void {
                if (!this.canSwap(ball)) {
                        throw new Error("balls cannot swap");
                }
                let temp = this.clone();
                this.move(ball.x, ball.y);
                ball.move(temp.x, temp.y);
        }

        public clone() {
                return new Ball(this.x, this.y, this.radius, this.color);
        }
}
