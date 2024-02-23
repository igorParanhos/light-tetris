import styles from "./Main.module.scss";
import { PhysicsCanvas } from "../../components/PhysicsCanvas";
import { GameContext, useGameContext } from "../../context/GameContext";
import { Show, useContext } from "solid-js";

const Header = () => {
    return (
        <header class={styles.header}>
            <h1>Light Tetris</h1>
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

    return (
        <div class={styles.controls}>
            <Show when={state.state === "idle"}>
                <AnimatedButton
                    onClick={() => {
                        console.log("test");
                        console.log(state)
                        // setState("state", () => "playing");
                        setGameState(() => "playing");
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
