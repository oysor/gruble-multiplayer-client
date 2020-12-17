import { createSlice } from '@reduxjs/toolkit'
import { ConnectionMode } from '../../common/constants/status'


export interface RoomState {
  lobbayName: string;
  timeLimit: number,
  boardCategories: Array<string>;
  BoardCapitalLetters: Array<string>;
  playerCount: number,
  status: ConnectionMode,
  connectionID: string,
  groupMessages: Array<string>;
}

const initialState: RoomState = {
  lobbayName: '',
  timeLimit: 0,
  boardCategories: [],
  BoardCapitalLetters: [],
  playerCount: 0,
  status: ConnectionMode.Connecting,
  connectionID: '',
  groupMessages: []
}

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    // Create methods here to update the store. 
    setRoomName: (state, action) => {
      state.lobbayName = action.payload
    },
    newMessage: (state, action) => {
      console.log("NEW MESSSAGE")
      state.groupMessages = [...state.groupMessages, action.payload]
    },
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setConnectionID: (state, action) => {
      console.log("CONNECTION ID CALLED")
      state.connectionID = action.payload
    }
  
  },
})

// import the actions where you want to dispatch them.
export const {
  setRoomName,
  setStatus,
  newMessage,
  setConnectionID
} = roomSlice.actions

export default roomSlice.reducer


