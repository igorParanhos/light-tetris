import { onCleanup, onMount } from "solid-js";
import style from "./Canvas.module.scss";

import {
    clearCanvas,
    createCanvas,
    createCircle,
    createLoop,
    createSquare,
} from "./utils";

export const Canvas = () => {
    let canvasRef: HTMLCanvasElement | undefined;
    let cancelLoop: () => void;

    onMount(() => {
        if (canvasRef instanceof HTMLCanvasElement) {
            const width = canvasRef.clientWidth;
            const height = canvasRef.clientHeight;

            const ctx = createCanvas(canvasRef, {
                width,
                height,
            });
            createSquare(ctx, 100, 100);
            createCircle(ctx, 200, 200);
            cancelLoop = createLoop((time) => {
                clearCanvas(ctx);

                const nTime = time / 1;

                createCircle(
                    ctx,
                    (200 + time / 3) % width,
                    100 + Math.cos(nTime / 100) * 10,
                    5
                );
                createCircle(
                    ctx,
                    (200 + time / 4) % width,
                    200 + Math.cos(nTime / 100) * 10,
                    5
                );
                createCircle(
                    ctx,
                    (200 + time / 5) % width,
                    300 + Math.cos(nTime / 100) * 10,
                    5
                );
            });
        }
    });

    onCleanup(() => {
        cancelLoop();
    });

    return <canvas ref={canvasRef} class={style.canvas} />;
};
