import { Engine, Render, Runner, Bodies, Composite } from "matter-js";

const WORLD_GRAVITY = 1;
const RESTITUTION = 0.5;

const COLOR_GREEN = "#D4EBCC";
const COLOR_PURPLE = "#D4DAEF";
const COLOR_CREAM100 = "#F3DDE2";
const COLOR_CREAM200 = "#F7E6EA";
const COLOR_CREAM300 = "#FAEFF2";
const COLOR_GREEN100 = "#A2D5CA";
const COLOR_GREEN200 = "#B1E0D6";

const COLOR_GRAY100 = "#808080";
const COLOR_GRAY200 = "#999999";
const COLOR_RED100 = "#D88D99";
const COLOR_RED200 = "#E6B2BB";
const COLOR_RED300 = "#F3D8DD";

const getRandomColor = () => {
    const colors = [
        COLOR_GREEN100,
        COLOR_GREEN200,
        // COLOR_CREAM100,
        // COLOR_CREAM200,
        // COLOR_CREAM300,
        COLOR_PURPLE,
        COLOR_GREEN,
        COLOR_GRAY100,
        COLOR_GRAY200,
        COLOR_RED100,
        COLOR_RED200,
        COLOR_RED300,
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

export class PhysicsController {
    engine: Engine;
    renderer: Render;
    runner: Runner;

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

        this.runner = Runner.create();
        this.engine.gravity.y = WORLD_GRAVITY;
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

    run() {
        Render.run(this.renderer);
        Runner.run(this.runner, this.engine);
    }

    destroy() {
        Render.stop(this.renderer);
        Runner.stop(this.runner);
    }
}
