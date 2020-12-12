import * as signalR from "@microsoft/signalr";


// Builds the SignalR connection, mapping it to /chat
const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:5001/chathub")
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




