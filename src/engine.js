export class Engine {
    constructor() {
        this.entities = new Map();
        this.systems = [];

        this.last = 0;
        this.running = false;

        this.ctx = null;
        this.canvas = null;

        this.input = new Input();
    }

    init(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.resize();
        window.addEventListener("resize", () => this.resize());

        this.input.attach();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createEntity(data = {}) {
        const id = crypto.randomUUID();

        this.entities.set(id, {
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            size: 10,
            color: "white",
            ...data
        });

        return id;
    }

    get(id) {
        return this.entities.get(id);
    }

    addSystem(fn) {
        this.systems.push(fn);
    }

    update(dt) {
        // SYSTEM LAYER (USER LOGIC)
        for (const sys of this.systems) {
            sys(this, dt);
        }

        // CORE INTEGRATION (engine-owned motion)
        for (const e of this.entities.values()) {
            e.x += e.vx * dt;
            e.y += e.vy * dt;
        }
    }

    draw() {
        const ctx = this.ctx;

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const e of this.entities.values()) {
            ctx.fillStyle = e.color;
            ctx.fillRect(e.x, e.y, e.size, e.size);
        }
    }

    loop = (t) => {
        if (!this.running) return;

        const dt = (t - this.last) / 1000;
        this.last = t;

        this.update(dt);
        this.draw();

        requestAnimationFrame(this.loop);
    };

    start() {
        this.running = true;
        this.last = performance.now();
        requestAnimationFrame(this.loop);
    }
}

/* ======================
   INPUT SYSTEM (FIXED)
====================== */

class Input {
    constructor() {
        this.keys = new Set();
    }

    attach() {
        window.addEventListener("keydown", e => this.keys.add(e.key));
        window.addEventListener("keyup", e => this.keys.delete(e.key));
    }

    down(key) {
        return this.keys.has(key);
    }
}
