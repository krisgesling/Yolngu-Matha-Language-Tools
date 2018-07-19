import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserInput from './components/UserInput.js';
import Menu from './components/Menu.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'userOptions': {
        'sortAZ': false
      }
    };
    this.updateState = this.updateState.bind(this);
  }
  updateState(newObj) {
    this.setState(prevState => ({
      ...newObj
    }));
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img
            src={logo}
            className="App-logo"
            alt="logo"
          />
          <h1>Yolŋu Matha</h1>
          <Menu
            userOptions={this.state.userOptions}
            updateState={this.updateState}
          />
        </div>
        <UserInput
          userOptions={this.state.userOptions}
          updateState={this.updateState}
        />

      </div>
    );
  }
}

export default App;
