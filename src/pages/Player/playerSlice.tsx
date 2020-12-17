import { createSlice } from '@reduxjs/toolkit'
import { ConnectionMode } from '../../common/constants/status'

export interface playerState {
  name: string;
  status : ConnectionMode
  score: number
  message: string;
}

const initialState: playerState = {
  name: '',
  status: ConnectionMode.Connecting,
  score: 0,
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


