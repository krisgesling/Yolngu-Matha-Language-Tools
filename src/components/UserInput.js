import React, { Component } from 'react';
import lookupWord from './LookupWord';
import WordSuggestions from './WordSuggestions';

class UserInput extends Component {

  constructor(props) {
    super(props);
    this.state = { 'userInput': '', 'suggestions': [''] };
    this.inputUpdate = this.inputUpdate.bind(this);
  }

  inputUpdate(e) {
    const newValue = e.target.value;
    const inputLookup = lookupWord(newValue)
    this.setState({
      'userInput': newValue,
      'definition': inputLookup.definition,
      'suggestions': inputLookup.suggestions
    });
  }

  selectedSuggestion(word) {
    const mockEvent = {'target': {'value': word.selectedSuggestion}}
    this.inputUpdate(mockEvent)
  }

  render() {
    return (
      <div className="user-input">
        <textarea value={this.state.userInput} onChange={this.inputUpdate} />
        <WordSuggestions words={this.state.suggestions} onSelectSuggestion={this.selectedSuggestion.bind(this)}/>
        <p>{this.state.definition}</p>
      </div>
    );
  }

}

export default UserInput;
