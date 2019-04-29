import React, { useContext, useEffect } from "react";
import PlayerContext from "./contexts/PlayerContext";
import socket from "./socket";
import { PLAYER_JOIN_ROOM } from "./actions";

const Players: React.FC = () => {
  const { players,setPlayers } = useContext(PlayerContext);

  useEffect(() => {
    socket.on(
      PLAYER_JOIN_ROOM, (socketId: string, nickname: string) => {
        setPlayers(prevPlayers => [...prevPlayers, nickname]);
      }
    )
  },[]);

  return (
    <div>
      {players.map((player, index) => (
        <div>{player}</div>
      ))}
    </div>
  );
};

export default Players;
