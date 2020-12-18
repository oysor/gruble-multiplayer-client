import { configureStore, Middleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import playerReducer, { playerToServer, setRoomId , receiveMessagePlayer} from './pages/Player/playerSlice'
import roomReducer, {roomToServer, fromServer, setStatus, roomCreated, receiveMessageRoom} from './pages/Room/roomSlice'
import { ConnectionMode } from './common/constants/status'
import * as signalR from "@microsoft/signalr";

// Builds the SignalR connection, mapping it to /chathub
const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:5001/chathub")
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Information)
  .build();

/**
 *   START CONNECTION METHOD - add singnalR 'on' here
 */
export async function start(): Promise<void> {
  try {
    await hubConnection.start();
    console.log("***** SignalR Connected *****");
    store.dispatch(setStatus(ConnectionMode.Connected))

    hubConnection.on(fromServer.RoomCreated, (msg) => {
      store.dispatch(roomCreated(msg))
      // Hub must also join room
      hubConnection.invoke(roomToServer.JoinRoom, msg)

    })

    hubConnection.on(fromServer.PlayerJoinedRoom, (msg) => {
      console.log("PLAYER JOINED ROOM")
      store.dispatch(receiveMessageRoom(msg))
      store.dispatch(receiveMessagePlayer(msg))
    })

    hubConnection.on(fromServer.ReceiveMessage, (msg, msg2) => {
      console.log("RECEIVE MESSAGE")
      console.log(msg, msg2)
      const combinedMessage = (msg + " says " + msg2)
      store.dispatch(receiveMessageRoom(combinedMessage))
      store.dispatch(receiveMessagePlayer(combinedMessage))
    })

  } catch (err) {
    console.log(err);
    console.log("***** Connection FAILED ******");
    store.dispatch(setStatus(ConnectionMode.Failed))
    setTimeout(start, 5000);
  }
}

hubConnection.onclose(start);

// Starts the signalR connection
start();

/**
 *   MIDDLEWARE - add singnalR 'invoke' here
 */
export const homeMadeMiddleware: Middleware = store => next => async action => {

    console.log("...Middleware...")

    if (action.type === roomToServer.CreateNewRoom) {
      hubConnection.invoke(roomToServer.CreateNewRoom)
      console.log("CREATE NEW ROOM")
    }

    if (action.type === playerToServer.JoinRoom) {
      hubConnection.invoke(playerToServer.JoinRoom, action.payload)
      store.dispatch(setRoomId(action.payload))
      console.log("JOIN ROOM")
    }

    if (action.type === playerToServer.SendMessage) {
      console.log(action.payload.user, action.payload.msg, action.payload.roomId)
      hubConnection.invoke(playerToServer.SendMessage, action.payload.user, action.payload.msg, action.payload.roomId)
      console.log("SEND MESSAGE")
    }


    console.log(store.getState);

    return next(action);
};

/**
 *   STORE
 */
const store = configureStore({
    reducer: {
        player: playerReducer,
        room: roomReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(homeMadeMiddleware).concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
})


export type RootState = ReturnType<typeof store.getState>;

export default store;

