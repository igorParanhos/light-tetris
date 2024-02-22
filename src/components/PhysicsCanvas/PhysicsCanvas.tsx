import { onCleanup, onMount } from "solid-js";
import { clamp, createRandomPiece, getRandomColor } from "./utils";
import styles from "./PhysicsCanvas.module.scss";
import { PhysicsController } from "./PhysicsController";

export const createScenario = (controller: PhysicsController) => {
    const ground = controller.createGround(
        controller.percentToPx(50, "x"),
        controller.percentToPx(90, "y") - 60,
        controller.percentToPx(50, "x"),
        60
    );
    const wall1 = controller.createGround(
        controller.percentToPx(25, "x") - 25,
        controller.percentToPx(90, "y") - 200,
        50,
        400
    );
    const wall2 = controller.createGround(
        controller.percentToPx(75, "x") + 25,
        controller.percentToPx(90, "y") - 200,
        50,
        400
    );

    controller.addBodies([ground, wall1, wall2]);
};

export const PhysicsCanvas = () => {
    let canvasRef: HTMLCanvasElement | undefined;
    let controller: PhysicsController | undefined;
    let updateInterval: number | undefined;
    let cancelLoop: () => void;

    onMount(() => {
        controller = new PhysicsController(canvasRef!);
        createScenario(controller);
        controller.run();

        updateInterval = setInterval(() => {
            cancelLoop?.();
            const mousePosition = controller?.mouse.position;

            const piece = createRandomPiece(
                clamp(
                    controller?.percentToPx(25, "x") || 0,
                    mousePosition?.x || Math.random() * 100,
                    controller?.percentToPx(75, "x") || 1000
                ),
                -100,
                getRandomColor()
            );
            controller?.addBodies([piece]);

            cancelLoop = controller!.onTick(() => {
                console.log('ticking')
                const mousePosition = controller?.mouse.position;
                piece.position.x = clamp(
                    controller?.percentToPx(25, "x") || 0,
                    mousePosition?.x || Math.random() * 100,
                    controller?.percentToPx(75, "x") || 1000
                );
            });
        }, 1000);
    });

    onCleanup(() => {
        controller?.destroy();
        clearInterval(updateInterval);
    });

    return <canvas class={styles.container} ref={canvasRef} />;
};
