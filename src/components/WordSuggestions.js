import React, { Component } from 'react';

class WordSuggestions extends Component {
  listSuggestions(words) {
    const list = Object.keys(words)
    // TODO why am I iterating over object.keys twice for no reason?
    return list.map((word, i) => {
      return this.createTableRow(word, i+1)
    })
  }
  createTableRow(word, i) {
    return (
      <tr key={i} onClick={() => this.selectSuggestion(word)}>
        <td>{word}</td>
        <td>{this.props.words[word]}</td>
      </tr>
    )
  }
  selectSuggestion(word) {
    this.props.onSelectSuggestion(word)
  }
  render() {
    if (Object.keys(this.props.words).length > 0) {
      return (
        <div className="word-suggestions">
          <h3>Did you mean...</h3>
          <table>
            <thead>
              <tr>
                <th>Yolŋu Matha</th>
                <th>English</th>
              </tr>
            </thead>
            <tbody>
              {this.listSuggestions(this.props.words)}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="word-suggestions">
        </div>
      )
    }

  }

}

export default WordSuggestions;
