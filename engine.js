
import RAPIER from "https://cdn.skypack.dev/@dimforge/rapier2d-compat";

class Input {
    static keys = new Set();
    static init(){
        window.addEventListener("keydown",e=>this.keys.add(e.key));
        window.addEventListener("keyup",e=>this.keys.delete(e.key));
    }
    static down(k){ return this.keys.has(k); }
}

class Physics {
    constructor(){ this.world=null; }
    async init(){
        await RAPIER.init();
        this.world = new RAPIER.World({x:0,y:-9.81});
    }
    step(dt){ this.world.step(); }
}

class ECS {
    constructor(){
        this.pos = new Float32Array(2000);
        this.entities = [];
    }
    create(){
        const id = this.entities.length;
        this.entities.push(id);
        this.pos[id*2]=200;
        this.pos[id*2+1]=200;
        return id;
    }
}

class Renderer {
    init(canvas){
        this.ctx = canvas.getContext("2d");
    }
    clear(){
        this.ctx.clearRect(0,0,innerWidth,innerHeight);
    }
    draw(x,y){
        this.ctx.fillStyle="white";
        this.ctx.beginPath();
        this.ctx.arc(x,y,10,0,Math.PI*2);
        this.ctx.fill();
    }
}

class Engine {
    constructor(){
        this.ecs=new ECS();
        this.physics=new Physics();
        this.renderer=new Renderer();
        this.last=0;
    }

    async init(canvas){
        await this.physics.init();
        this.renderer.init(canvas);
        Input.init();
        this.player=this.ecs.create();
    }

    update(dt){
        let i=this.player*2;
        if(Input.down("w")) this.ecs.pos[i+1]-=200*dt;
        if(Input.down("s")) this.ecs.pos[i+1]+=200*dt;
        if(Input.down("a")) this.ecs.pos[i]-=200*dt;
        if(Input.down("d")) this.ecs.pos[i]+=200*dt;
        this.physics.step(dt);
    }

    draw(){
        this.renderer.clear();
        let i=this.player*2;
        this.renderer.draw(this.ecs.pos[i],this.ecs.pos[i+1]);
    }

    loop=(t)=>{
        let dt=(t-this.last)/1000;
        this.last=t;
        this.update(dt);
        this.draw();
        requestAnimationFrame(this.loop);
    }
}

const canvas=document.getElementById("game");
const engine=new Engine();
await engine.init(canvas);
engine.loop(0);
