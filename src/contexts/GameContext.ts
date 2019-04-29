import React from "react";

export interface IGame {
    room?: string;
    hasStarted: boolean;
  }

export interface IGameContext {
    game: IGame
    setGame: React.Dispatch<React.SetStateAction<IGame>>
}

const GameContext = React.createContext({} as IGameContext);

export default GameContext;