import React from 'react'
import Context from './context';
class App extends React.Component {
  render() {
    return (
      <Context.Consumer>
        {(store) => {
          return (<div>Register <a href={"test"}>Test</a>
            * {store.theme} *
          </div>)
        }}

      </Context.Consumer>
    );
  }
}

export default App;
