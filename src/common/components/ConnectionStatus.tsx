import React, { FunctionComponent } from 'react';
import { ConnectionMode } from '../constants/status';

interface ConnectionStatusProps {
    status: ConnectionMode
}

export const ConnectionStatus: FunctionComponent<ConnectionStatusProps> = ({ status }) => {

    const connectionStatus = () => {
        switch (status) {
            case ConnectionMode.Connecting:
                return 'Connecting...'
            case ConnectionMode.Disconnected:
                return 'Disconnected'
            case ConnectionMode.Reconnecting:
                return 'Reconnecting'
            case ConnectionMode.Connected:
                return 'Connected'
            case ConnectionMode.Failed:
                return 'Connection Failed'
            default:
                return 'Unknown connection status'
        }
    } 

    return (
        <div className="connection-status" > 
            <h2>{connectionStatus()}</h2>
        </div>
    )
}

export default ConnectionStatus;