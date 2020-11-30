// import React from "react";
import * as signalR from "@microsoft/signalr";
import React, { useState, useEffect } from "react";

export interface LayoutProps {
    connection: signalR.HubConnection
    message: string
}

export class Layout extends React.Component <LayoutProps>{

    public render() : JSX.Element {

        const SignalRClient: React.FC = () => {
            const [clientMessage, setClientMessage] = useState<string | null>(null);
            useEffect(() => {
              this.props.connection.on("setClientMessage", message => {
                setClientMessage(message);
              });
            });
            return <p>{clientMessage}</p>;
          };

    return(   
        <SignalRClient />
    )
  }
}
