import { Composite, Engine, Events, Mouse, Render, Runner } from "matter-js";
import { WORLD_GRAVITY } from "../utils/contants";
import { Level0 } from "../levels";
import { Level } from "../levels/Level";
import { Observable, createObservable } from "../utils/utils";

const getLevel = (level: number) => {
  const levels = [Level0];
  return levels[level];
};

export class PhysicsController {
  #engine: Engine;
  #renderer: Render;
  #runner: Runner;
  #mouse: Mouse;
  #_level: Level | undefined;

  currentLevel: number = 0;
  score: Observable = createObservable(0);

  constructor(element: HTMLCanvasElement) {
    this.#engine = Engine.create();
    this.#renderer = Render.create({
      canvas: element,
      engine: this.#engine,
      options: {
        width: element.clientWidth,
        height: element.clientHeight,
        wireframes: false,
        background: "rgba(0, 0, 0, 0)",
      },
    });

    this.#mouse = Mouse.create(this.#renderer.canvas);
    this.#runner = Runner.create();
    this.#engine.gravity.y = WORLD_GRAVITY;
  }

  get width() {
    return this.#renderer.options.width || 0;
  }

  get height() {
    return this.#renderer.options.height || 0;
  }

  get mouse() {
    return this.#mouse;
  }

  percentToPx(percent: number, axis: "x" | "y"): number {
    if (axis === "x") {
      return (this.width * percent) / 100;
    }
    return (this.height * percent) / 100;
  }

  onTick(callback: (e: any) => void) {
    Events.on(this.#runner, "tick", callback);
    return () => {
      this.removeOnTick(callback);
    };
  }

  removeOnTick(callback: (e: any) => void) {
    Events.off(this.#runner, "tick", callback);
  }

  addBodies(bodies: any[]) {
    Composite.add(this.#engine.world, bodies);
  }

  setupLevel() {
    if (!this.#_level) {
      this.#_level = new (getLevel(this.currentLevel))();
    }

    if (!this.#_level.initialized) {
      this.#_level.createLevel(this);
    }
  }

  pause() {
    Runner.stop(this.#runner);
  }

  resume() {
    Runner.start(this.#runner, this.#engine);
  }

  run() {
    Render.run(this.#renderer);
    Runner.run(this.#runner, this.#engine);
  }

  destroy() {
    Render.stop(this.#renderer);
    Runner.stop(this.#runner);
  }
}

export default PhysicsController;
