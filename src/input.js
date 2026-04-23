export class Input {
    constructor() {
        this.keys = new Set();
        this.mouse = { x: 0, y: 0, down: false };
    }

    attach() {
        window.addEventListener("keydown", e => this.keys.add(e.key));
        window.addEventListener("keyup", e => this.keys.delete(e.key));

        window.addEventListener("mousemove", e => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        window.addEventListener("mousedown", () => this.mouse.down = true);
        window.addEventListener("mouseup", () => this.mouse.down = false);
    }

    down(key) {
        return this.keys.has(key);
    }
}
