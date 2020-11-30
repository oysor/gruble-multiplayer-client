import ReactDOM from "react-dom";
import React from "react";
import { Layout } from "./Layout";
import * as hub from "./Hub/hubConnection";


const App = () => {

  const hubConnection = hub.startHubConnection();

  return (
    <Layout message="test" connection={hubConnection}/>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById("root")
);