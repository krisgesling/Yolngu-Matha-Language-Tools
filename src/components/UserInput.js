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
    let newValue; //, caretPos;
    if ((newInput.length-prevValue.length) === 1) {
      newValue = newInput.split('');
      newValue.some((char, i, arr) => {
        if (char !== prevValue.charAt(i)) {
          // caretPos = i+1;
          if (arr[i-1] === ';' && this.state.modKey && keyMap[char]) {

            newValue.splice((i-1), 2, keyMap[char])
          };
          char === ';'
            ? this.setState({ 'modKey': true})
            : this.setState({'modKey': false});
          return true
        } else return false
      })
    }
    return {
      'newValue': newValue ? newValue.join('') : newInput //,
      // 'caretPos': caretPos ? caretPos : newInput.length
    };
  }

  getCaretPosition(element) {
    // IE < 9 support
    if (document.selection) {
      element.focus();
      const range = document.selection.createRange();
      const rangeLen = range.text.length;
      range.moveStart('character', -element.value.length);
      const start = range.text.length - rangeLen;
      return {'start': start, 'end': start + rangeLen };
    }
    // IE >=9 and other browsers
    // eslint-disable-next-line
    else if (element.selectionStart || element.selectionStart == '0') {
      return {'start': element.selectionStart, 'end': element.selectionEnd };
    } else {
      return {'start': 0, 'end': 0}
    }
  }
  setCaretPosition({element, start, end}) {
    if (!start) {
      console.log('Error: No start position for caret provided.');
      return false
    };
    console.log('Setting Position at: ', start);
    console.log('on: ', element);
    end = end ? end : start;
    // via http://blog.vishalon.net/javascript-getting-and-setting-caret-position-in-textarea
    // IE >= 9 and other browsers
    // Other pages:
    // https://github.com/facebook/react/issues/955
    // https://stackoverflow.com/questions/42038590/when-to-use-react-setstate-callback
    if(element.setSelectionRange) {
      console.log('Path #1');
      element.focus();
      element.setSelectionRange(start, end);
    }
    // IE < 9
    else if (element.createTextRange) {
      console.log('Path #2');
      const range = element.createTextRange();
      range.collapse(true);
      range.moveEnd('character', end);
      range.moveStart('character', start);
      range.select();
    }
  }

  inputUpdate(e) {
    const yolnguVal = this.yolnguKeyboard({
      'prevValue': this.state.userInput,
      'newInput': e.target.value
    });
    const inputLookup = lookupWord(yolnguVal.newValue);
    const newCaretPos = this.getCaretPosition(e.target);
    console.log('newCaretPos: ', newCaretPos);
    this.setState({
      'userInput': yolnguVal.newValue,
      'definition': inputLookup.definition,
      'suggestions': inputLookup.suggestions
    });
    this.setCaretPosition({
        'element': e.target,
        'start': newCaretPos.start,
        'end': newCaretPos.end
        //'start': yolnguVal.caretPos
    })
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
