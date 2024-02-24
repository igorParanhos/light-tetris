import { createEffect, onCleanup, onMount } from "solid-js";
import { clamp, createRandomPiece, getRandomColor } from "./utils";
import { PhysicsController } from "./PhysicsController";
import styles from "./PhysicsCanvas.module.scss";
import { useGameContext } from "../../context/GameContext";

export const PhysicsCanvas = () => {
    let canvasRef: HTMLCanvasElement | undefined;
    let controller: PhysicsController | undefined;
    let updateInterval: number | undefined;
    // const { state, setState } = useGameContext();
    const { state, setScore } = useGameContext();

    createEffect(() => {
        if (state.state === "playing") {
            controller = new PhysicsController(canvasRef!);
            controller.run();
        }
        return () => {
            controller?.destroy();
            clearInterval(updateInterval);
        };
    });

    onMount(() => {});

    onCleanup(() => {
        controller?.destroy();
        clearInterval(updateInterval);
    });

    return (
        <>
            <canvas class={styles.container} ref={canvasRef} />
        </>
    );
};
