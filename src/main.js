import { Engine } from "./engine.js";

const canvas = document.getElementById("game");
const engine = new Engine();

await engine.init(canvas);

// create player
const player = engine.createEntity({
    x: 200,
    y: 200,
    size: 14,
    color: "white"
});

// SYSTEM (game logic layer)
engine.addSystem((engine, dt) => {
    const p = engine.get(player);

    if (engine.input.down("w")) p.y -= 200 * dt;
    if (engine.input.down("s")) p.y += 200 * dt;
    if (engine.input.down("a")) p.x -= 200 * dt;
    if (engine.input.down("d")) p.x += 200 * dt;
});

engine.start();
