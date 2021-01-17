import React, { FunctionComponent } from 'react';
import { ConnectionMode } from '../constants/status';

interface ConnectionStatusProps {
    status: ConnectionMode;
}

export const ConnectionStatus: FunctionComponent<ConnectionStatusProps> = ({ status }) => {

    const connectionStatus = () => {
        switch (status) {
            case ConnectionMode.Connecting:
                return <span style={{color: "grey"}}>Connecting...</span>
            case ConnectionMode.Disconnected:
                return <span style={{color: "black"}}>Disconnected</span>
            case ConnectionMode.Reconnecting:
                return <span style={{color: "grey"}}>Reconnecting...</span>
            case ConnectionMode.Connected:
                return <span style={{color: "green"}}>Connected</span>
            case ConnectionMode.Failed:
                return <span style={{color: "red"}}>Connection Failed</span>
        }
    };

    return (
        <div className="connection-status" > 
            {connectionStatus()}
        </div>
    );
}