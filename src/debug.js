export class Debug {
    constructor() {
        this.last = performance.now();
        this.fps = 0;
    }

    draw(ctx, ecs) {
        const now = performance.now();
        this.fps = 1000 / (now - this.last);
        this.last = now;

        ctx.fillStyle = "white";
        ctx.font = "12px monospace";

        ctx.fillText(`FPS: ${this.fps.toFixed(1)}`, 10, 20);
        ctx.fillText(`Entities: ${ecs.entities.size}`, 10, 40);
    }
}
