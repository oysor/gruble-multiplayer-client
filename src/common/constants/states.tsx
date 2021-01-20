import { ConnectionMode } from './status'

export interface CommonStates {
    playerCount: number;
    status: ConnectionMode;
    elapsedTime: number;
  }
  
export const initialCommonStates: CommonStates = {
    playerCount: 0,
    status: ConnectionMode.Connecting,
    elapsedTime: 0
  }
