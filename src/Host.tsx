import React, { useState, useEffect, useContext } from "react";
import socket from "./socket";
import { HOST_REQUEST, INITIATE_ROOM } from "./actions";
import GameContext from "./contexts/GameContext";
import PlayerContext from "./contexts/PlayerContext";
import { RouteComponentProps } from "react-router-dom";

const Host: React.FC<RouteComponentProps> = ({match, history}) => {
  const [nickname, setNickname] = useState("");
  const [word, setWord] = useState("");

  const { setGame } = useContext(GameContext);
  const { players, setPlayers } = useContext(PlayerContext);

  const handleHost = () => {
    console.log("here");
    socket.emit(HOST_REQUEST, word, nickname);
  };

  useEffect(() => {
    socket.on(
      INITIATE_ROOM,
      (room: string, nickname: string, socketId: string) => {
        // TODO: refactor to interface and single object?
        setGame(prevGame => ({...prevGame, room: room}));
        setPlayers(prevPlayers => ([...prevPlayers, nickname]));
        history.push('/game/' + room);
      }
    );
  },[setGame, setPlayers]);

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
        <label>Your Word</label>
        <input
          type="text"
          name="word"
          value={word}
          onChange={event => setWord(event.target.value)}
          required
        />
      </div>
      <div>
        <button onClick={() => handleHost()}>Host</button>
      </div>
    </div>
  );
};

export default Host;
