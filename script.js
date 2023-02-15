const cnv = document.getElementById("canvas");
const ctx = cnv.getContext("2d");
const FPS = 60;
const G = 6.67428e-11;
var mouse, circles = [], previous = {x: null, y: null};

class Circle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 10;
        this.m = 100;
        this.velX = 0;
        this.velY = 0;
        this.color = "white";
    };

    updateCircle() {
        for (let circle = 0; circle < circles.length; circle++) {
            if (this != circles[circle]) {
                let distanceX = circles[circle].x - this.x;
                let distanceY = circles[circle].y - this.y;
                let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                let force = this.m * circles[circle].m / (distance * distance);
                let theta = Math.atan2(distanceY, distanceX);
                let forceX = Math.cos(theta) * force;
                let forceY = Math.sin(theta) * force;
                this.velX += forceX / this.m;
                this.velY += forceY / this.m;
                if (distance > this.r + circles[circle].r) {

                };
                this.x += this.velX;
                this.y += this.velY;
            };
        };
    };

    drawCircle() {
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    };
};

(function init() {
    addEventListener("mousedown", (e) => {circles.push(new Circle(e.clientX, e.clientY));});
    addEventListener("mousemove", (e) => {mouse = {x: e.clientX, y: e.clientY, r: 10, velX: 0, velY: 0};});
    setInterval(main, 1000 / FPS);
}());


function main() {
    cnv.width = window.innerWidth;
    cnv.height = window.innerHeight;

    for (let circle = 0; circle < circles.length; circle++) {
        circles[circle].updateCircle();
        circles[circle].drawCircle();
    };
};