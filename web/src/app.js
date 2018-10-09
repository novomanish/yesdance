import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from  './routes';
import Context from './Component/context';

class App extends React.Component {
  constructor() {
    super()
    this.state = {theme: 'light'}
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Context.Provider>
    );
  }
}

export default App;
