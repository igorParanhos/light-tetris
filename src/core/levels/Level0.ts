import { Bodies } from "matter-js";
import { PhysicsController } from "../controller/PhysicsController";
import { clamp, createRandomPiece, pickRandom } from "../utils/utils";
import { Level } from "./Level";
import {
  COLOR_GREEN100,
  COLOR_PURPLE,
  COLOR_RED100,
  FRICTION,
} from "../utils/contants";

const createGround = (
  x: number,
  y: number,
  width: number,
  height: number,
  options?: any,
) => {
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
};

const createScenario = (controller: PhysicsController) => {
  const ground = createGround(
    controller.percentToPx(50, "x"),
    controller.percentToPx(90, "y") - 60,
    controller.percentToPx(50, "x"),
    60,
  );
  const wall1 = createGround(
    controller.percentToPx(25, "x") - 25,
    controller.percentToPx(90, "y") - 200,
    50,
    400,
  );
  const wall2 = createGround(
    controller.percentToPx(75, "x") + 25,
    controller.percentToPx(90, "y") - 200,
    50,
    400,
  );

  controller.addBodies([ground, wall1, wall2]);
};

const getColor = () => pickRandom([COLOR_GREEN100, COLOR_PURPLE, COLOR_RED100]);

export class Level0 extends Level {
  _interval: number | undefined;
  _cancelLoop: () => void = () => {};
  initialized = false;
  destroyed = false;

  constructor() {
    super("Level 0", "The first level");
  }

  createLevel(controller: PhysicsController): void {
    console.log("creating level");
    createScenario(controller);

    this._interval = setInterval(() => {
      this._cancelLoop?.();
      const mousePosition = controller?.mouse.position;
      controller.score.value++;
      const piece = createRandomPiece(
        clamp(
          controller?.percentToPx(25, "x") || 0,
          mousePosition?.x || Math.random() * 100,
          controller?.percentToPx(75, "x") || 9999,
        ),
        -100,
        getColor(),
      );
      controller?.addBodies([piece]);

      this._cancelLoop = controller!.onTick(() => {
        const mousePosition = controller?.mouse.position;
        piece.position.x = clamp(
          controller?.percentToPx(25, "x") || 0,
          mousePosition?.x || Math.random() * 100,
          controller?.percentToPx(75, "x") || 9999,
        );
      });
    }, 1000);
    this.initialized = true;
  }

  destroyLevel(): void {
    clearInterval(this._interval);
    this._cancelLoop();
    this.destroyed = true;
  }
}
