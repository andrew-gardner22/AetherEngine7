export class Assets {
    constructor() {
        this.cache = new Map();
    }

    async load(path) {
        if (this.cache.has(path)) return this.cache.get(path);

        const res = await fetch(path);
        let data;

        if (path.endsWith(".json")) {
            data = await res.json();
        } else if (path.match(/\.(png|jpg|jpeg)$/)) {
            const blob = await res.blob();
            data = URL.createObjectURL(blob);
        } else {
            data = await res.text();
        }

        this.cache.set(path, data);
        return data;
    }
}
