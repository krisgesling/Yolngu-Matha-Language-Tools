import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserInput from './components/UserInput.js';
import Menu from './components/Menu.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Menu />
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Yolŋu Matha</h1>
        </div>
        <UserInput />

      </div>
    );
  }
}

export default App;
