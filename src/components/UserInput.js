import React, { Component } from 'react';
import lookupWord from './LookupWord';

class UserInput extends Component {

  constructor(props) {
    super(props);
    this.state = { userInput: '' };
    this.inputUpdate = this.inputUpdate.bind(this);
  }

  inputUpdate(e) {
    var newValue = e.target.value;
    this.setState({ 'userInput': newValue });
  }

  render() {
    return (
      <div className="user-input">
        <textarea value={this.state.userInput} onChange={this.inputUpdate} />
        <p>{lookupWord(this.state.userInput)}</p>
      </div>
    );
  }

}

export default UserInput;
