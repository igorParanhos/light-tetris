import { createEffect, onCleanup, onMount } from "solid-js";
import { PhysicsController } from "../../core/controller/PhysicsController";
import styles from "./PhysicsCanvas.module.scss";
import { useGameContext } from "../../context/GameContext";

export const PhysicsCanvas = () => {
  let canvasRef: HTMLCanvasElement | undefined;
  let controller: PhysicsController | undefined;
  let updateInterval: number | undefined;

  const { state, setScore } = useGameContext();

  const updateScore = (value: number) => {
    setScore(() => value);
  };

  createEffect(() => {
    if (state.state === "playing") {
      controller = new PhysicsController(canvasRef!);
      controller.run();
      controller.score.subscribe(updateScore);
    }
    return () => {
      controller?.destroy();
      clearInterval(updateInterval);
    };
  });

  onMount(() => {});

  onCleanup(() => {
    controller?.destroy();
    controller?.score.unsubscribe(updateScore);

    clearInterval(updateInterval);
  });

  return (
    <>
      <canvas
        class={styles.canvas}
        classList={{ [styles.active]: state.state === "playing" }}
        ref={canvasRef}
      />
    </>
  );
};
