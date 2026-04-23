import { Engine } from "./engine.js";

const canvas = document.getElementById("game");
const engine = new Engine();

// =========================
// BOOT ENGINE
// =========================
engine.init(canvas).then(() => {
    startGame();
});

// =========================
// GAME LAYER (USER LOGIC ONLY)
// =========================
function startGame() {

    // -------------------------
    // CREATE PLAYER ENTITY
    // -------------------------
    const player = engine.createEntity({
        x: 200,
        y: 200,
        size: 14,
        color: "white"
    });

    // -------------------------
    // INPUT SYSTEM (CLEAN USAGE)
    // -------------------------
    engine.addSystem((engine, dt) => {

        const p = engine.get(player);
        const speed = 220;

        // movement
        if (engine.input.down("w")) p.y -= speed * dt;
        if (engine.input.down("s")) p.y += speed * dt;
        if (engine.input.down("a")) p.x -= speed * dt;
        if (engine.input.down("d")) p.x += speed * dt;

    });

    // -------------------------
    // START ENGINE LOOP
    // -------------------------
    engine.start();
}
