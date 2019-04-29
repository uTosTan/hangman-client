import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Host from "./Host";
import Join from "./Join";
import Home from "./Home";
import Game from "./Game";

import HostContext from "./contexts/HostContext";
import PlayerContext from "./contexts/PlayerContext";
import AttemptContext from "./contexts/AttemptContext";
import GameContext, { IGame } from "./contexts/GameContext";

interface Host {
  word?: string;
  isHost: boolean;
}

interface Game {
  room?: string;
  hasStarted: boolean;
}

interface Attempt {
  attempts: any;
  blanks: Array<string>;
  alphabet: Array<string>;
}

const App: React.FC = () => {
  const [host, setHost] = useState<Host>({
    word: undefined,
    isHost: false
  });

  const [game, setGame] = useState<IGame>({
    room: undefined,
    hasStarted: false
  });

  const [players, setPlayers] = useState<Array<string>>([]);

  const [attempt, setAttempt] = useState<Attempt>({
    attempts: {},
    blanks: [],
    alphabet: Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
  });

  return (
    <Router>
      <GameContext.Provider value={{ game, setGame }}>
        <HostContext.Provider value={{ host, setHost }}>
          <PlayerContext.Provider value={{ players, setPlayers }}>
            <AttemptContext.Provider value={{ attempt, setAttempt }}>
              <div className="App">
                <div>
                  <h2>Multiplayer Hangman</h2>
                </div>
                <div className="App-header">
                  <Route path="/" exact component={Home} />
                  <Route path="/host" component={Host} />
                  <Route path="/join" component={Join} />
                  <Route path="/game/:room" component={Game} />
                </div>
              </div>
            </AttemptContext.Provider>
          </PlayerContext.Provider>
        </HostContext.Provider>
      </GameContext.Provider>
    </Router>
  );
};

export default App;
