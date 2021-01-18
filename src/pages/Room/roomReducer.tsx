import { createSlice } from '@reduxjs/toolkit'
import {  CommonStates, initialCommonState } from '../../common/components/CommonStates'

export interface RoomState {
  lobbyName: string;
  roomId: string;
  timeLimit: number;
  maxUsers: number;
  boardCategories: Array<string>;
  BoardCapitalLetters: Array<string>;
  //playerCount: number;
  //status: ConnectionMode;
  connectionID: string;
  messages: string;
  //elapsedTime: number;
  commonstates: CommonStates;
}

const initialState: RoomState = {
  lobbyName: '',
  roomId: '',
  timeLimit: 0,
  maxUsers: 0,
  boardCategories: [],
  BoardCapitalLetters: [],
  connectionID: '',
  messages: '',
  commonstates: initialCommonState
}

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    // Create methods here to update the store. 
    setRoomName: (state, action) => {
      state.lobbyName = action.payload
    },
    newMessage: (state, action) => {
      console.log("NEW MESSSAGE")
      state.messages = action.payload
    },
    setStatus: (state, action) => {
      state.commonstates.status = action.payload
    },
    setConnectionID: (state, action) => {
      console.log("CONNECTION ID CALLED")
      state.connectionID = action.payload
    },
    roomCreated: (state, action) => {
      state.roomId = action.payload.roomName
      state.lobbyName = action.payload.lobbyName
      state.timeLimit = action.payload.timeLimit
      state.maxUsers = action.payload.maxUsers
      console.log("Reducer: timeLimit: ", action.payload.timeLimit)

      console.log("Reducer: createNewRoom: ", action.payload)
    },
    // receiveMessageRoom: (state, action) => {
    //   state.messages = String(action.payload)
    //   console.log("Reducer: receiveMessage: ", action.payload)
    // }
    setTimeElapsed: (state, action) => {
      state.commonstates.elapsedTime = action.payload
    }
  },
})


// send to server
export enum roomToServer {
  CreateRoom = 'CreateRoom',
  JoinRoom = 'JoinRoom',
}

// receive from server
export enum fromServer {
  onCreateRoom = "onCreateGame",
  onPlayerJoined = "onPlayerJoined",
  PlayerJoinedRoom = 'PlayerJoinedRoom',
  ReceiveMessage = "ReceiveMessage"

}

// import the actions where you want to dispatch them.
export const {
  roomCreated,
  setRoomName,
  setStatus,
  newMessage,
  setConnectionID,
  setTimeElapsed
  // receiveMessageRoom
} = roomSlice.actions

export default roomSlice.reducer


