import "./App.scss";
import { GameProvider } from "./context/GameContext";
import Main from "./pages/Main";

function App() {
  return (
    <GameProvider>
      <Main />
    </GameProvider>
  );
}

export default App;
