import { createSlice } from '@reduxjs/toolkit'
import { ConnectionMode } from '../../common/constants/status'


export interface RoomState {
  lobbyName: string;
  roomId: string;
  timeLimit: number,
  boardCategories: Array<string>;
  BoardCapitalLetters: Array<string>;
  playerCount: number,
  status: ConnectionMode,
  connectionID: string,
  groupMessages: string;
}

const initialState: RoomState = {
  lobbyName: '',
  roomId: '',
  timeLimit: 0,
  boardCategories: [],
  BoardCapitalLetters: [],
  playerCount: 0,
  status: ConnectionMode.Connecting,
  connectionID: '',
  groupMessages: ''
}

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    // Create methods here to update the store. 
    setRoomName: (state, action) => {
      state.lobbyName = action.payload
    },
    // newMessage: (state, action) => {
    //   console.log("NEW MESSSAGE")
    //   state.groupMessages = [...state.groupMessages, action.payload]
    // },
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setConnectionID: (state, action) => {
      console.log("CONNECTION ID CALLED")
      state.connectionID = action.payload
    },
    roomCreated: (state, action) => {
      state.roomId = action.payload
      console.log("Reducer: createNewRoom: ", action.payload)
    },
    receiveMessageRoom: (state, action) => {
      state.groupMessages = String(action.payload)
      console.log("Reducer: receiveMessage: ", action.payload)
    }
  },
})


// communication to server
export enum roomToServer {
  CreateNewRoom = 'CreateNewRoom',
  JoinRoom = 'JoinRoom',
}

// communication from server
export enum fromServer {
  RoomCreated = "RoomCreated",
  PlayerJoinedRoom = 'PlayerJoinedRoom',
  ReceiveMessage = "ReceiveMessage"

}

// import the actions where you want to dispatch them.
export const {
  roomCreated,
  setRoomName,
  setStatus,
  // newMessage,
  setConnectionID,
  receiveMessageRoom
} = roomSlice.actions

export default roomSlice.reducer


