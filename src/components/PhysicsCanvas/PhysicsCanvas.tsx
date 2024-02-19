import { onCleanup, onMount } from "solid-js";
import { PhysicsController } from "./utils";
import styles from "./PhysicsCanvas.module.scss";

export const PhysicsCanvas = () => {
    let canvasRef: HTMLCanvasElement | undefined;
    let controller: PhysicsController | undefined;

    onMount(() => {
        controller = new PhysicsController(canvasRef!);

        const box = controller.createBox(400, 100, 80, 80, {
            angle: Math.PI * 0.1,
        });
        const circle = controller.createCircle(500, 200, 40, {
            angle: Math.PI * 0.1,
        });
        const ground = controller.createGround(400, 500, 700, 60);

        controller.addBodies([box, circle, ground]);
        controller.run();
    });

    onCleanup(() => {
        controller?.destroy();
    });

    return <canvas class={styles.container} ref={canvasRef} />;
};
