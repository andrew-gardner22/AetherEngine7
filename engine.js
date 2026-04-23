export class Engine {
    constructor() {
        this.entities = new Map();
        this.last = 0;
        this.ctx = null;
        this.running = false;
    }

    init(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.resize();
        window.addEventListener("resize", () => this.resize());

        this.ctx.fillStyle = "white";
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createEntity(x, y, r = 10) {
        const id = crypto.randomUUID();

        this.entities.set(id, {
            x, y, r,
            vx: 0, vy: 0
        });

        return id;
    }

    get(id) {
        return this.entities.get(id);
    }

    update(dt) {
        for (const e of this.entities.values()) {
            e.x += e.vx * dt;
            e.y += e.vy * dt;
        }
    }

    draw() {
        const ctx = this.ctx;

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const e of this.entities.values()) {
            ctx.beginPath();
            ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    loop = (t) => {
        if (!this.running) return;

        const dt = (t - this.last) / 1000;
        this.last = t;

        this.update(dt);
        this.draw();

        requestAnimationFrame(this.loop);
    }

    start() {
        this.running = true;
        this.last = performance.now();
        requestAnimationFrame(this.loop);
    }
}
