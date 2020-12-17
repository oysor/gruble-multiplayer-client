import * as signalR from "@microsoft/signalr";
// import useDispatch from 'react-redux'

// Builds the SignalR connection, mapping it to /chat
const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:5001/chathub")
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Information)
  .build();

export async function start(): Promise<void> {
  try {
    await hubConnection.start();
    console.log("***** SignalR Connected *****");
  } catch (err) {
    console.log(err);
    console.log("Connection FAILED!!!");

    setTimeout(start, 5000);
  }
}

hubConnection.onclose(start);



export default hubConnection;




