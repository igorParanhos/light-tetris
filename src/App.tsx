import "./App.scss";
import { Canvas } from "./components/Canvas";
import { PhysicsCanvas } from "./components/PhysicsCanvas";

function App() {
    return (
        <>
            {/* <Canvas /> */}
            <h1>Light Tetris</h1>
            <PhysicsCanvas />
        </>
    );
}

export default App;
