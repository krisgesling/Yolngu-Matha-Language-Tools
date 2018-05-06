import React, { Component } from 'react';

class WordSuggestions extends Component {
  listSuggestions(words) {
    const numOfBtns = 8;
    const list = (words.length > numOfBtns)
      ? words.slice(0,numOfBtns)
      : words
    return list.map((word, i) => {
      return this.createButton(word, i+1)
    })
  }
  createButton(word, i) {
    return <button key={i} onClick={() => this.selectSuggestion(word)}>{word}</button>
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
