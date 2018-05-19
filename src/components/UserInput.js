import React, { Component } from 'react';
import lookupWord from './LookupWord';
import WordSuggestions from './WordSuggestions';

class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'userInput': '',
      'suggestions': [''],
      'modKey': false,
      'caretPos': 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.selectedSuggestion = this.selectedSuggestion.bind(this);
    this.yolnguKeyboard = this.yolnguKeyboard.bind(this);
  }
  componentDidUpdate({value}) {
    if (this.state.userInput !== value) {
      const str = this.state.userInput.substr(0, this.state.caretPos);
      const index = String(this.state.userInput).indexOf(str) + this.state.caretPos;

      if (index !== -1) {
        this.refs.input.selectionStart = this.refs.input.selectionEnd = index;
      }
    }
  }
  yolnguKeyboard({prevValue, newInput}) {
    const keyMap = {
      'a': 'ä', 'd': 'ḏ', 'j': 'ŋ', 'l': 'ḻ', 'n': 'ṉ', 't': 'ṯ',
      'A': 'Ä', 'D': 'Ḏ', 'J': 'Ŋ', 'L': 'Ḻ', 'N': 'Ṉ', 'T': 'Ṯ'
    }
    let newValue, modified;
    if ((newInput.length-prevValue.length) === 1) {
      newValue = newInput.split('');
      newValue.some((char, i, arr) => {
        if (char !== prevValue.charAt(i)) {
          if (arr[i-1] === ';' && this.state.modKey && keyMap[char]) {
            newValue.splice((i-1), 2, keyMap[char])
            modified = true
          };
          char === ';'
            ? this.setState({ 'modKey': true})
            : this.setState({'modKey': false});
          return true
        } else return false
      })
    }
    return {
      'newValue': newValue ? newValue.join('') : newInput,
      'modified': modified ? modified : false
    };
  }
  handleChange(e) {
    const yolnguVal = this.yolnguKeyboard({
      'prevValue': this.state.userInput,
      'newInput': e.target.value
    });
    const inputLookup = lookupWord(yolnguVal.newValue);
    const caretPos = yolnguVal.modified
      ? e.target.selectionEnd-1
      : e.target.selectionEnd;
    this.setState({
      'userInput': yolnguVal.newValue,
      'definition': inputLookup.definition,
      'suggestions': inputLookup.suggestions,
      'caretPos': Number(caretPos)
    });
  }
  selectedSuggestion(word) {
    const mockEvent = {'target': {'value': word.selectedSuggestion}};
    this.handleChange(mockEvent);
  }

  render() {
    return (
      <div className="user-input">
        <textarea
          autoFocus={true}
          value={this.state.userInput}
          onChange={this.handleChange}
          ref="input"
        />
        <WordSuggestions
          words={this.state.suggestions}
          onSelectSuggestion={this.selectedSuggestion}
        />
        <h3>Definition</h3>
        <p>{this.state.definition}</p>
      </div>
    );
  }

}

export default UserInput;
