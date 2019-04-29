import React from "react";
import { RouteComponentProps } from "react-router-dom";

interface Props {
  room: string;
}

const Game: React.FC<RouteComponentProps<Props>> = ({ match }) => {
  return <div>{match.params.room}</div>;
};

export default Game;
