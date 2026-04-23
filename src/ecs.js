export class ECS {
    constructor() {
        this.entities = new Map();
        this.nextId = 0;
    }

    create(components = {}) {
        const id = this.nextId++;

        this.entities.set(id, {
            position: { x: 0, y: 0 },
            velocity: { x: 0, y: 0 },
            size: 10,
            color: "white",
            ...components
        });

        return id;
    }

    get(id) {
        return this.entities.get(id);
    }

    all() {
        return this.entities.values();
    }

    update(dt) {
        for (const e of this.entities.values()) {
            e.position.x += e.velocity.x * dt;
            e.position.y += e.velocity.y * dt;
        }
    }
}
