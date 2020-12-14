import React, {FunctionComponent } from "react";
import Room from './features/room/Room'
import "./App.css"

const App: FunctionComponent = () => {

  return (
    <div className="App">
        <Room/>
    </div>
  );
}

export default App;


// enum UserPageMode {
//   CONNECTING = "CONNECTING",
//   CONNECTED = "CONNECTED"
// }

// interface ConnectingPageProps {
//   mode: UserPageMode.CONNECTING;
// }

// interface ConnectedPageProps {
//   mode: UserPageMode.CONNECTED;
//   name: string;
//   email: string;
//   birthday: string;
// }

// type Props = ConnectingPageProps | ConnectedPageProps;




// class App extends Component<Props> {
//   render() {
//     switch (this.props.mode) {
//       case ConnectingPageProps.LOADING:
//         // We won't have any other props
//         return <div>Loading...</div>;
//       case ConnectedPageProps.LOADED:
//         // In this mode, we can display user information
//         return (
//           <div>

//           </div>
//         );
//     }
//   }
// }
