import RAPIER from "https://cdn.jsdelivr.net/npm/@dimforge/rapier2d-compat@0.11.2/rapier.min.js";

export class Physics {
    constructor() {
        this.world = null;
        this.bodies = new Map();
        this.ready = false;
    }

    async init() {
        await RAPIER.init();
        this.world = new RAPIER.World({ x: 0, y: -9.81 });
        this.ready = true;
    }

    createBox(id, x, y) {
        const body = this.world.createRigidBody(
            RAPIER.RigidBodyDesc.dynamic().setTranslation(x, y)
        );

        this.world.createCollider(
            RAPIER.ColliderDesc.cuboid(0.5, 0.5),
            body
        );

        this.bodies.set(id, body);
        return body;
    }

    step(dt) {
        if (!this.ready) return;
        this.world.step();
    }
}
