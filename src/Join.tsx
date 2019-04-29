import React, { useState, useEffect, useContext } from "react";
import socket from "./socket";
import { JOIN_REQUEST, INITIATE_PLAYER } from "./actions";
import PlayerContext from "./contexts/PlayerContext";
import { RouteComponentProps } from "react-router-dom";

const Join: React.FC<RouteComponentProps> = ({ history }) => {
  const [nickname, setNickname] = useState("");
  const [room, setRoom] = useState("");
  const { setPlayers } = useContext(PlayerContext);

  const handleJoin = () => {
    socket.emit(JOIN_REQUEST, room, nickname);
  };

  useEffect(() => {
    socket.on(INITIATE_PLAYER, (room: string, host: string, players: string) => {
      const playerArray = JSON.parse(players);
      setPlayers(prevPlayer => [...prevPlayer, ...playerArray]);
      history.push("/game/" + room);
    });
  }, [setPlayers]);

  return (
    <div>
      <div>
        <label>Your Nickname</label>
        <input
          type="text"
          name="nickname"
          value={nickname}
          onChange={event => setNickname(event.target.value)}
          required
        />
      </div>
      <div>
        <label>Room Name</label>
        <input
          type="text"
          name="word"
          value={room}
          onChange={event => setRoom(event.target.value)}
          required
        />
      </div>
      <div>
        <button onClick={() => handleJoin()}>Join</button>
      </div>
    </div>
  );
};

export default Join;
