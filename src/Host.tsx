import React, { useState, useEffect, useContext } from "react";
import socket from "./socket";
import { RouteComponentProps } from "react-router-dom";
import { HOST_REQUEST, INITIATE_ROOM } from "./actions";
import GameContext from "./contexts/GameContext";
import PlayerContext from "./contexts/PlayerContext";
import HostContext from "./contexts/HostContext";

const Host: React.FC<RouteComponentProps> = ({ history }) => {
  const [nickname, setNickname] = useState("");
  const [word, setWord] = useState("");

  const { setGame } = useContext(GameContext);
  const { setPlayers } = useContext(PlayerContext);
  const { setHost } = useContext(HostContext);

  const handleHost = () => {
    socket.emit(HOST_REQUEST, word, nickname);
  };

  useEffect(() => {
    socket.on(
      INITIATE_ROOM,
      (room: string, nickname: string, socketId: string) => {
        // TODO: refactor to interface and single object?
        setGame(prevGame => ({ ...prevGame, room: room }));
        setPlayers(prevPlayers => [...prevPlayers, nickname]);
        setHost(prevHost => ({ ...prevHost, word: word, isHost: true }));
        history.push("/game/" + room);
      }
    );
  }, [setGame, setPlayers, history]);

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
