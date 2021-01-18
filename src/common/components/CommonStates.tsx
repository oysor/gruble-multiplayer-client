import { ConnectionMode } from '../../common/constants/status'

export interface CommonStates {
    playerCount: number;
    status: ConnectionMode;
    elapsedTime: number;
  }
  
  export const initialCommonState: CommonStates = {
    playerCount: 0,
    status: ConnectionMode.Connecting,
    elapsedTime: 0
  }
