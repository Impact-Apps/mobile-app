import React from "react";
import RootStack from "./router";
import { Provider } from 'react-redux';
import { store } from './redux';

class App extends React.Component {
  render() {
    return(
    <Provider store={store}>
      <RootStack />
    </Provider>
    )
  }
}

export default App;
