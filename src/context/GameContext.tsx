import { Component, createContext, useContext } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";

type GameProvider = {
  children: any;
};

type GameState = "idle" | "playing" | "paused" | "gameover";

type GameStore = {
  state: GameState;
  score: number;
};

type GameContext = {
  state: GameStore;
  setState: SetStoreFunction<GameStore>;
  setScore: (setStateFn: (score: number) => number) => void;
  setGameState: (setStateFn: (state: GameState) => GameState) => void;
};

const Context = createContext<GameContext>(
  {
    state: {
      state: "idle",
      score: 0,
    },
    setState: () => {},
    setScore: () => {},
    setGameState: () => {},
  },
  { name: "GameContext" },
);

export const GameContext = Context;

export const GameProvider: Component<GameProvider> = (props) => {
  const [state, setState] = createStore<GameStore>({
    state: "idle",
    score: 0,
  });

  const value = {
    state,
    setGameState(setStateFn: (state: GameState) => GameState) {
      setState("state", setStateFn);
    },
    setScore(setStateFn: (score: number) => number) {
      setState("score", setStateFn);
    },
    setState,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export const useGameContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
