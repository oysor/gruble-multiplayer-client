
export enum LoadingMode {
  Loading = 'LOADING',
  Loaded = 'LOADED',
  Idle = 'IDLE'
}

/**
 * Enum containing all possible connection status types.
 */
export enum ConnectionMode {
  Connecting = 'CONNECTING',
  Connected = 'CONNECTED',
  Disconnected = 'DISCONNECTED',
  Reconnecting = 'RECONNECTING',
  Failed = 'FAILED'
}