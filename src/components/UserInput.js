import React, { Component } from 'react';
import lookupWord from '../functions/LookupWord';

class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'userInput': '',
      'modKey': false,
      'multiWord': false,
      'caretPos': 0
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleOption = this.toggleOption.bind(this);
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
  handleInputChange(e = {'target': this.refs.input}) {
    const yolnguVal = this.yolnguKeyboard({
      'prevValue': this.state.userInput,
      'newInput': e.target.value
    });
    const inputLookup = lookupWord({
      'inputWord': yolnguVal.newValue,
      'isFlexiSearch': this.props.userOptions.isFlexiSearch
    });
    const caretPos = yolnguVal.modified
      ? e.target.selectionEnd-1
      : e.target.selectionEnd;
    this.setState({
      'userInput': yolnguVal.newValue,
      'multiWord': inputLookup.multiWord,
      'caretPos': Number(caretPos)
    })
    this.props.updateState({
      'suggestions': inputLookup.suggestions,
      'totalSuggestions': inputLookup.totalSuggestions
    });
  }
  toggleOption(e) {
    const key = e.target.id.slice(12);
    let newObj = {'userOptions': {}}
    newObj.userOptions[key] = this.props.userOptions[key] ? false : true;
    this.props.updateState(newObj);
    if (key === 'isFlexiSearch') this.handleInputChange();
  }
  render() {
    return (
      <div className="user-input">
        <textarea
          placeholder="You can type in Yolŋu Matha or English..."
          value={this.state.userInput}
          onChange={this.handleInputChange}
          ref="input"
        />
        <div className="switch-container">
          <span className="label">FlexiSearch</span>
          <label className="switch" >
            <input
              id="user-option-isFlexiSearch"
              type="checkbox"
              checked={this.props.userOptions.isFlexiSearch}
              onChange={this.toggleOption}
            />
            <span className="slider round"></span>
          </label>
        </div>

      </div>
    );
  }

}

export default UserInput;
