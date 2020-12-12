import { createSlice } from '@reduxjs/toolkit'

export interface playerState {
  name: string;
  message: string;
}

const initialState: playerState = {
  name: '',
  message: ''
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayerName: (state, action) => {
      state.name = action.payload
    },
    sendMessage: (state, action) => {
      state.message = action.payload
    }
  },
})

export const {
  setPlayerName,
  sendMessage
} = playerSlice.actions

export default playerSlice.reducer


