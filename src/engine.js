import { Input } from "./input.js";
import { Physics } from "./physics.js";
import { Assets } from "./assets.js";

export class Engine {
    constructor() {
        // -------------------------
        // CORE STATE
        // -------------------------
        this.entities = new Map();
        this.systems = [];

        this.last = 0;
        this.running = false;

        // -------------------------
        // MODULES
        // -------------------------
        this.input = new Input();
        this.physics = new Physics();
        this.assets = new Assets();

        // rendering
        this.canvas = null;
        this.ctx = null;
    }

    // =========================
    // INIT ENGINE (CALL ONCE)
    // =========================
    async init(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        // INPUT SYSTEM
        this.input.attach();

        // PHYSICS (WASM SAFE INIT)
        await this.physics.init();

        // CANVAS SETUP
        this.resize();
        window.addEventListener("resize", () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // =========================
    // ENTITY SYSTEM
    // =========================
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

    // =========================
    // SYSTEMS (GAME LOGIC HOOKS)
    // =========================
    addSystem(fn) {
        this.systems.push(fn);
    }

    // =========================
    // UPDATE LOOP
    // =========================
    update(dt) {
        // 1. USER SYSTEMS
        for (const sys of this.systems) {
            sys(this, dt);
        }

        // 2. ECS BASIC INTEGRATION
        for (const e of this.entities.values()) {
            e.x += e.vx * dt;
            e.y += e.vy * dt;
        }

        // 3. PHYSICS STEP (optional)
        this.physics.step(dt);
    }

    // =========================
    // RENDER LOOP
    // =========================
    draw() {
        const ctx = this.ctx;

        // clear screen
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // draw entities
        for (const e of this.entities.values()) {
            ctx.fillStyle = e.color;
            ctx.fillRect(e.x, e.y, e.size, e.size);
        }
    }

    // =========================
    // MAIN LOOP
    // =========================
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

    stop() {
        this.running = false;
    }
}
