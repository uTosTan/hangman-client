import React from "react";

interface IPlayerContext {
    players: Array<string>,
    setPlayers: React.Dispatch<React.SetStateAction<Array<string>>>
}

const PlayerContext = React.createContext({} as IPlayerContext); // players

export default PlayerContext;