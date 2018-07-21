import React, { Component } from 'react';
import lookupWord from './LookupWord';
import WordSuggestions from './WordSuggestions';
import Definitions from './Definitions';

class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'userInput': '',
      'suggestions': {},
      'totalSuggestions': 0,
      'modKey': false,
      'multiWord': false,
      'caretPos': 0,
      'definitions': {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.addDefinition = this.addDefinition.bind(this);
    this.removeDefinition = this.removeDefinition.bind(this);
    this.yolnguKeyboard = this.yolnguKeyboard.bind(this);
  }
  componentDidMount(){
    this.refs.input.focus()
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
      'suggestions': inputLookup.suggestions,
      'totalSuggestions': inputLookup.totalSuggestions,
      'multiWord': inputLookup.multiWord,
      'caretPos': Number(caretPos)
    });
    if (inputLookup.definition) {
      // TODO return definition as object already
      let newDef = {};
      newDef[inputLookup.word] = inputLookup.definition;
    }
  }
  addDefinition(value) {
    if (!value) {
      return console.error('No value provided to addDefinition');
    }
    let definition = {};
    if (
      typeof value === 'object'
      && value.constructor === Object
      && value.word === String
      && value.definition === String
      ) {
        definition[value.word] = value.definition;
    } else {
      const newDef = lookupWord(value);
      definition[newDef.word] = newDef.definition;
    }
    const newDefs = {
      ...this.state.definitions,
      ...definition
    };

    this.setState(prevState => ({
      'definitions': newDefs
    }));
    this.refs.input.focus()
  }
  removeDefinition(word) {
    let newDefs = this.state.definitions;
    delete newDefs[word];
    this.setState(prevState => ({
      'definitions': newDefs
    }));
    this.refs.input.focus()
  }

  render() {
    return (
      <div className="user-input">
        <textarea
          placeholder="You can type in Yolŋu Matha or English..."
          value={this.state.userInput}
          onChange={this.handleChange}
          ref="input"
        />
        <WordSuggestions
          words={this.state.suggestions}
          totalSuggestions={this.state.totalSuggestions}
          addDefinition={this.addDefinition}
          onSelectSuggestion={this.selectedSuggestion}
        />
        <Definitions
          words={this.state.definitions}
          removeDefinition={this.removeDefinition}
          userOptions={this.props.userOptions}
          updateState={this.props.updateState}
        />
      </div>
    );
  }

}

export default UserInput;
