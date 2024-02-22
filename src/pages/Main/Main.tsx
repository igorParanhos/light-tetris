import styles from "./Main.module.scss";
import { PhysicsCanvas } from "../../components/PhysicsCanvas";

const Header = () => {
    return (
        <header class={styles.header}>
            <h1>Light Tetris</h1>
        </header>
    );
}

const Footer = () => {
    const year = new Date().getFullYear();
    
    return (
        <footer class={styles.footer}>
            <p>Created by <a href="https://clownfsh.com">Clownfsh</a> @{year}</p>
        </footer>
    );
}

export const Main = () => {
    return (
        <main class={styles.main}>
            <section class={styles.content}>
                <Header />
                <Footer />
            </section>
            <PhysicsCanvas />
        </main>
    );
};

export default Main;
