import React, { Component } from 'react';
import lookupWord from './LookupWord';
import WordSuggestions from './WordSuggestions';

class UserInput extends Component {

  constructor(props) {
    super(props);
    this.state = { 'userInput': '', 'suggestions': [''], 'modifierKey': false };
    this.inputUpdate = this.inputUpdate.bind(this);
    this.selectedSuggestion = this.selectedSuggestion.bind(this);
    this.yolnguKeyboard = this.yolnguKeyboard.bind(this);
  }

  yolnguKeyboard(key) {
    let newKey, modified;
    if (this.state.modifierKey) {
      const keyMap = {
        'a': 'ä',
        'd': 'ḏ',
        'j': 'ŋ',
        'l': 'ḻ',
        'n': 'ṉ',
        't': 'ṯ',
        'A': 'Ä',
        'D': 'Ḏ',
        'J': 'Ŋ',
        'L': 'Ḻ',
        'N': 'Ṉ',
        'T': 'Ṯ'
      }
      if (keyMap[key]) {
        newKey = keyMap[key]
        modified = true;
      } else {
        modified = false
      }
      this.setState({'modifierKey': false})
    } else {
      modified = false;
      if (key === ';') this.setState({ 'modifierKey': true})
    }
    return {
      'key': (newKey ? newKey : key),
      'modified': modified
    };
  }

  inputUpdate(e) {
    // TODO find diff between newValue and state.userInput
    const inpVal = e.target.value;
    const charIndex = inpVal.length-1
    let newInputArr = inpVal.split('');
    const yolnguValue = this.yolnguKeyboard(inpVal[charIndex]);
    yolnguValue.modified
      ? newInputArr.splice(charIndex-1, 2, yolnguValue.key)
      : newInputArr[charIndex] = this.yolnguKeyboard(inpVal[charIndex]).key;
    const newValue = newInputArr.join('')
    const inputLookup = lookupWord(newValue);
    this.setState({
      'userInput': newValue,
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
