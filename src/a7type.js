export function compileA7(source) {

    // VERY SIMPLE TRANSFORM LAYER (placeholder compiler)
    // later becomes real AST compiler

    const lines = source.split("\n");

    return function system(ecs, dt, input) {

        for (const e of ecs.entities.values()) {

            for (const line of lines) {
                const l = line.trim();

                // example syntax: move_up 100
                if (l.startsWith("move_up")) {
                    e.y -= 100 * dt;
                }

                if (l.startsWith("move_down")) {
                    e.y += 100 * dt;
                }
            }
        }
    };
}
