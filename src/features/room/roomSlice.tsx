import { createSlice } from '@reduxjs/toolkit'
import { LoadingMode } from '../../constants/status'


export interface RoomState {
  name: string;
  status: LoadingMode,
  message: string;
}

const initialState: RoomState = {
  name: '',
  status: LoadingMode.Loading,
  message: ''
}

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoomName: (state, action) => {
      state.name = action.payload
    },
    sendMessage: (state, action) => {
      state.message = action.payload
    },
    newMessage: (state, action) => {
      state.message = action.payload
    },
    setStatus: (state, action) => {
      state.status = action.payload
    }
  },
})

export const {
  setRoomName,
  sendMessage,
  setStatus,
  newMessage
} = roomSlice.actions

export default roomSlice.reducer


