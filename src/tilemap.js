export class Tilemap {
    constructor(w, h, size) {
        this.w = w;
        this.h = h;
        this.size = size;

        // deterministic pattern (NOT random every reload)
        this.data = [];

        for (let i = 0; i < w * h; i++) {
            this.data[i] = (i % 7 === 0) ? 1 : 0;
        }
    }

    draw(renderer) {
        for (let y = 0; y < this.h; y++) {
            for (let x = 0; x < this.w; x++) {
                const i = y * this.w + x;

                if (this.data[i]) {
                    renderer.rect(
                        x * this.size,
                        y * this.size,
                        this.size,
                        this.size,
                        "#111"
                    );
                }
            }
        }
    }
}
