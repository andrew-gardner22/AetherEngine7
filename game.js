import { Engine } from "./engine.js";

const canvas = document.getElementById("c");

const engine = new Engine();
engine.init(canvas);

// PLAYER
const player = engine.createEntity(200, 200, 12);

// INPUT
const keys = new Set();

window.addEventListener("keydown", e => keys.add(e.key));
window.addEventListener("keyup", e => keys.delete(e.key));

// GAME LOOP HOOK
engine.update = function(dt) {
    const p = this.get(player);

    const speed = 220;

    if (keys.has("w")) p.y -= speed * dt;
    if (keys.has("s")) p.y += speed * dt;
    if (keys.has("a")) p.x -= speed * dt;
    if (keys.has("d")) p.x += speed * dt;
};

engine.start();
