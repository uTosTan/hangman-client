import React from "react";

export interface IHost {
  word?: string;
  isHost: boolean;
}

export interface IHostContext {
  host: IHost,
  setHost: React.Dispatch<React.SetStateAction<IHost>>
}

const HostContext = React.createContext({} as IHostContext); // word, isHost

export default HostContext;
