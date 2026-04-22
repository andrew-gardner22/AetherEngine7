import RAPIER from "https://cdn.jsdelivr.net/npm/@dimforge/rapier2d-compat@0.11.2/rapier.min.js";

class Input {
    static keys = new Set();

    static init() {
        window.addEventListener("keydown", e => this.keys.add(e.key));
        window.addEventListener("keyup", e => this.keys.delete(e.key));
    }

    static down(k) {
        return this.keys.has(k);
    }
}

class Physics {
    constructor() {
        this.world = null;
        this.ready = false;
    }

    async init() {
        await RAPIER.init();
        this.world = new RAPIER.World({ x: 0, y: -9.81 });
        this.ready = true;
    }

    step(dt) {
        if (!this.ready) return;
        this.world.step();
    }
}

class ECS {
    constructor() {
        this.pos = new Float32Array(2000);
        this.entities = [];
    }

    create() {
        const id = this.entities.length;
        this.entities.push(id);

        this.pos[id * 2] = 200;
        this.pos[id * 2 + 1] = 200;

        return id;
    }
}

class Renderer {
    init(canvas) {
        this.ctx = canvas.getContext("2d");

        // IMPORTANT FIX: proper scaling
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        this.ctx.fillStyle = "white";
    }

    clear(canvas) {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    draw(x, y) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 10, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

class Engine {
    constructor() {
        this.ecs = new ECS();
        this.physics = new Physics();
        this.renderer = new Renderer();
        this.last = 0;
    }

    async init(canvas) {
        this.canvas = canvas;

        await this.physics.init();   // IMPORTANT: wait FIRST
        this.renderer.init(canvas);

        Input.init();

        this.player = this.ecs.create();
    }

    update(dt) {
        let i = this.player * 2;

        if (Input.down("w")) this.ecs.pos[i + 1] -= 200 * dt;
        if (Input.down("s")) this.ecs.pos[i + 1] += 200 * dt;
        if (Input.down("a")) this.ecs.pos[i] -= 200 * dt;
        if (Input.down("d")) this.ecs.pos[i] += 200 * dt;

        this.physics.step(dt);
    }

    draw() {
        this.renderer.clear(this.canvas);

        let i = this.player * 2;
        this.renderer.draw(this.ecs.pos[i], this.ecs.pos[i + 1]);
    }

    loop = (t) => {
        const dt = (t - this.last) / 1000;
        this.last = t;

        this.update(dt);
        this.draw();

        requestAnimationFrame(this.loop);
    };
}

const canvas = document.getElementById("game");
const engine = new Engine();

engine.init(canvas).then(() => {
    engine.loop(0);
});
