import { ConnectionMode } from './status'

export interface SharedStates {
    playerCount: number;
    status: ConnectionMode;
    elapsedTime: number;
  }
  
  export const initialSharedStates: SharedStates = {
    playerCount: 0,
    status: ConnectionMode.Connecting,
    elapsedTime: 0
  }
