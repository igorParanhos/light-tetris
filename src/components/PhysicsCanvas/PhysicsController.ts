import { Bodies, Composite, Engine, Events, Mouse, Render, Runner } from "matter-js";
import { COLOR_GREEN100, FRICTION, RESTITUTION, WORLD_GRAVITY } from "./contants";
import { getRandomColor } from "./utils";

export class PhysicsController {
    engine: Engine;
    renderer: Render;
    runner: Runner;
    mouse: Mouse;

    constructor(element: HTMLCanvasElement) {
        this.engine = Engine.create();
        this.renderer = Render.create({
            canvas: element,
            engine: this.engine,
            options: {
                width: element.clientWidth,
                height: element.clientHeight,
                wireframes: false,
                background: "rgba(255, 0, 0, 0)",
            },
        });

        this.mouse = Mouse.create(this.renderer.canvas);
        this.runner = Runner.create();
        this.engine.gravity.y = WORLD_GRAVITY;
    }

    get width() {
        return this.renderer.options.width || 0;
    }

    get height() {
        return this.renderer.options.height || 0;
    }

    onTick(callback: (e: any) => void) {
        Events.on(this.runner, 'tick', callback);
        return () => {
            this.removeOnTick(callback);
        }
    }

    removeOnTick(callback: (e: any) => void) {
        Events.off(this.runner, "tick", callback);
    }

    percentToPx(percent: number, axis: "x" | "y"): number {
        if (axis === "x") {
            return (this.width * percent) / 100;
        }
        return (this.height * percent) / 100;
    }

    createBox(
        x: number,
        y: number,
        width: number,
        height: number,
        options?: any
    ) {
        return Bodies.rectangle(x, y, width, height, {
            restitution: RESTITUTION,
            render: {
                fillStyle: "transparent",
                strokeStyle: getRandomColor(),
                lineWidth: 2,
            },
            ...options,
        });
    }

    createCircle(x: number, y: number, radius: number, options?: any) {
        return Bodies.circle(x, y, radius, {
            restitution: RESTITUTION,
            render: {
                fillStyle: "transparent",
                strokeStyle: getRandomColor(),
                lineWidth: 2,
            },
            ...options,
        });
    }

    createGround(
        x: number,
        y: number,
        width: number,
        height: number,
        options?: any
    ) {
        const obj = Bodies.rectangle(x, y, width, height, {
            isStatic: true,
            friction: FRICTION,
            render: {
                fillStyle: "transparent",
                strokeStyle: COLOR_GREEN100,
                lineWidth: 2,
            },
            ...options,
        });
        return obj;
    }

    addBodies(bodies: any[]) {
        Composite.add(this.engine.world, bodies);
    }

    destroy() {
        Render.stop(this.renderer);
        Runner.stop(this.runner);
    }

    run() {
        Render.run(this.renderer);
        Runner.run(this.runner, this.engine);
    }
}
