import { createSlice } from '@reduxjs/toolkit'

export interface RoomState {
  name: string;
  message: string;
}

const initialState: RoomState = {
  name: '',
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
    }
  },
})

export const {
  setRoomName,
  sendMessage
} = roomSlice.actions

export default roomSlice.reducer


