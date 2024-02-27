import styles from "./Main.module.scss";
import { PhysicsCanvas } from "../../components/PhysicsCanvas";
import { useGameContext } from "../../context/GameContext";
import { Show, createEffect, createSignal } from "solid-js";

const Header = () => {
    const { state } = useGameContext();
    return (
        <header class={styles.header}>
            <h1>Light Tetris</h1>
            <h2>Score: {state.score}</h2>
        </header>
    );
};

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer class={styles.footer}>
            <p>
                Created by <a href="https://clownfsh.com">Clownfsh</a> @{year}
            </p>
        </footer>
    );
};

const AnimatedButton = (props: any) => {
    return (
        <button class={styles.animatedButton} {...props}>
            <span>START</span>
        </button>
    );
};

const Controls = () => {
    // const { state, setState } = useContext(GameContext);
    const { state, setGameState } = useGameContext();
    const [started, setStarted] = createSignal(false);
    createEffect(() => {
        console.log("started", started());

    })

    return (
        <div class={styles.controls}>
            <Show when={state.state === "idle"}>
                <AnimatedButton
                    classList={{[styles.animatedButtonActive]: started()}}
                    onClick={() => {
                        setStarted(true);
                        setTimeout(() => {
                            setGameState(() => "playing");
                        }, 1000);
                    }}
                />
            </Show>
        </div>
    );
};

export const Main = () => {
    return (
        <main class={styles.main}>
            <section class={styles.content}>
                <Header />
                <Controls />
                <Footer />
            </section>
            <PhysicsCanvas />
        </main>
    );
};

export default Main;
