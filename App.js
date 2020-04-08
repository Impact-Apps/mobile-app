import React from "react";
import RootStack from "./router";
import { Provider } from 'react-redux';
import { store } from './redux';

class App extends React.Component {
  componentDidMount() {
    this.source = new EventSource('http://localhost:3003/api/events')
    this.source.addEventListener('notification', message => console.log(message.data))
    this.source.onmessage = () => console.log('received a non-special message')
  }

  render() {
    return(
    <Provider store={store}>
      <RootStack />
    </Provider>
    )
  }
}

export default App;
