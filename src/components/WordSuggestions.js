import React, { Component } from 'react';

class WordSuggestions extends Component {
  listSuggestions(words) {
    const numOfBtns = 8;
    const list = (words.length > numOfBtns)
      ? words.slice(0,numOfBtns)
      : words
    return list.map((word) => {
      return this.createButton(word)
    })
  }
  createButton(word) {
    return <button onClick={() => this.selectSuggestion(word)}>{word}</button>
  }
  selectSuggestion(word) {
    this.props.onSelectSuggestion({selectedSuggestion: word})
  }
  render() {

    return (
      <div className="word-suggestions">
        {this.listSuggestions(this.props.words)}
      </div>
    );
  }

}

export default WordSuggestions;
