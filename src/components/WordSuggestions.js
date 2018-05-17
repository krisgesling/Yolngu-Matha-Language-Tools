import React, { Component } from 'react';
import lookupWord from './LookupWord';

class WordSuggestions extends Component {
  listSuggestions(words) {
    const numOfBtns = 8;
    const list = (words.length > numOfBtns)
      ? words.slice(0,numOfBtns)
      : words
    return list.map((word, i) => {
      return this.createTableRow(word, i+1)
    })
  }
  createTableRow(word, i) {
    return (
      <tr key={i} onClick={() => this.selectSuggestion(word)}>
        <td>{word}</td>
        <td>{lookupWord(word).definition}</td>
      </tr>
    )
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
        <h3>Did you mean...</h3>
        <table>
          <tr>
            <th>Yolŋu Matha</th>
            <th>English</th>
          </tr>
          {this.listSuggestions(this.props.words)}
        </table>
      </div>
    );
  }

}

export default WordSuggestions;
