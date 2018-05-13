import React, { Component } from 'react';
import lookupWord from './LookupWord';
import WordSuggestions from './WordSuggestions';

class UserInput extends Component {

  constructor(props) {
    super(props);
    this.state = { 'userInput': '', 'suggestions': [''], 'modKey': false };
    this.inputUpdate = this.inputUpdate.bind(this);
    this.selectedSuggestion = this.selectedSuggestion.bind(this);
    this.yolnguKeyboard = this.yolnguKeyboard.bind(this);
  }

  yolnguKeyboard({prevValue, newInput}) {
    const keyMap = {
      'a': 'ä', 'd': 'ḏ', 'j': 'ŋ', 'l': 'ḻ', 'n': 'ṉ', 't': 'ṯ',
      'A': 'Ä', 'D': 'Ḏ', 'J': 'Ŋ', 'L': 'Ḻ', 'N': 'Ṉ', 'T': 'Ṯ'
    }
    let newValue;
    if ((newInput.length-prevValue.length) === 1) {
      newValue = newInput.split('');
      newValue.some((char, i, arr) => {
        if (char !== prevValue.charAt(i)) {
          if (arr[i-1] === ';' && this.state.modKey) {
            newValue.splice((i-1), 2, keyMap[char])
          };
          char === ';'
            ? this.setState({ 'modKey': true})
            : this.setState({'modKey': false});
        }
      })
    }
    return {
      'newValue': newValue ? newValue.join('') : newInput
    };
  }

  inputUpdate(e) {
    const yolnguVal = this.yolnguKeyboard({
      'prevValue': this.state.userInput,
      'newInput': e.target.value
    });
    const inputLookup = lookupWord(yolnguVal.newValue);
    this.setState({
      'userInput': yolnguVal.newValue,
      'definition': inputLookup.definition,
      'suggestions': inputLookup.suggestions
    });
  }

  selectedSuggestion(word) {
    const mockEvent = {'target': {'value': word.selectedSuggestion}};
    this.inputUpdate(mockEvent);
  }

  render() {
    return (
      <div className="user-input">
        <textarea value={this.state.userInput} onChange={this.inputUpdate} />
        <WordSuggestions words={this.state.suggestions} onSelectSuggestion={this.selectedSuggestion}/>
        <p>{this.state.definition}</p>
      </div>
    );
  }

}

export default UserInput;
