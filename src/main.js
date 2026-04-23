import { Engine } from "./engine.js";

const canvas = document.getElementById("game");

const engine = new Engine();
engine.init(canvas);

// PLAYER ENTITY
const player = engine.createEntity({
    x: 200,
    y: 200,
    size: 14,
    color: "white"
});

// INPUT BUFFER (clean + stable)
const keys = new Set();

window.addEventListener("keydown", e => keys.add(e.key));
window.addEventListener("keyup", e => keys.delete(e.key));

// SYSTEM (game logic layer)
engine.addSystem((engine, dt) => {
    const p = engine.get(player);

    const speed = 250;

    if (keys.has("w")) p.y -= speed * dt;
    if (keys.has("s")) p.y += speed * dt;
    if (keys.has("a")) p.x -= speed * dt;
    if (keys.has("d")) p.x += speed * dt;
});

engine.start();
