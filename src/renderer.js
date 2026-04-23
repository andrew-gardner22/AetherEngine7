export class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
    }

    clear(canvas) {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    rect(x, y, w, h, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
    }

    drawEntities(ecs) {
        for (const e of ecs.entities.values()) {
            this.rect(
                e.position ? e.position.x : e.x,
                e.position ? e.position.y : e.y,
                e.size,
                e.size,
                e.color
            );
        }
    }
}
