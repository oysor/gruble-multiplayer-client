import * as signalR from "@microsoft/signalr";

export function startHubConnection() : signalR.HubConnection {

  // Builds the SignalR connection, mapping it to /chat
  const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:5001/chathub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

  async function start() {
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

  // Starts the SignalR connection
  start().then(() => {
    // Once started, invokes the sendConnectionId in our ChatHub inside our ASP.NET Core application.
    if (hubConnection.connectionId) {
      console.log("Sent message to server");
      hubConnection.invoke("sendConnectionId", hubConnection.connectionId);
    }
  });

  return hubConnection;

}