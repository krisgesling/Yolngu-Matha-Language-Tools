import React, { Component } from 'react';
// import { CSSTransitionGroup } from 'react-transition-group'

class WordSuggestions extends Component {
  addDefinition(definition) {
    this.props.addDefinition(definition)
  }
  render() {
    const suggestions = Object.keys(this.props.words).map((word, i) => {
      return (
        <tr key={i+1} >
          <td>{word}</td>
          <td>{this.props.words[word]}</td>
          <td>
            <button className="btn add" onClick={() => this.addDefinition(word)}>
              +
            </button>
          </td>
        </tr>
      )
    });
    return (
      <div className="word-suggestions">
        <h3>Results</h3>
        {suggestions.length > 0 &&
          <span className="meta">
            Showing {suggestions.length} of {this.props.totalSuggestions}
          </span>
        }
        {suggestions.length > 0 &&
          <table>
            <thead>
              <tr>
                <th>Yolŋu Matha</th>
                <th>English</th>
              </tr>
            </thead>
            <tbody>
              {suggestions}
            </tbody>
          </table>
        }
      </div>
    );
  }
}

export default WordSuggestions;
