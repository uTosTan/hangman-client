import React, { useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import HostContext from "./contexts/HostContext";
import GameContext from "./contexts/GameContext";
import Players from "./Players";

interface Props {
  room: string;
}

const Game: React.FC<RouteComponentProps<Props>> = ({ match }) => {
  const { host, setHost } = useContext(HostContext);
  const { game, setGame } = useContext(GameContext);
  return (
    <div>
      <div><Players /></div>
      <div>{!game.hasStarted ? <div>Waiting</div> : <div>Playing</div>}</div>
    </div>
    
  );
};

export default Game;
