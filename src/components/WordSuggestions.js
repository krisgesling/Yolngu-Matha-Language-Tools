import React, { Component } from 'react';
// import { CSSTransitionGroup } from 'react-transition-group'

class WordSuggestions extends Component {
  addDefinition(definition) {
    this.props.addDefinition(definition)
  }
  wordCell({string, marks}) {
    const td = (marks[0])
      ? (<td>
          {marks.map((mark, i, arr) => { return (
            <span key={i+1}>
              {string.substring((arr[i-1] ? arr[i-1][1] : 0), arr[i][0])}
              <mark>
                {string.substring(mark[0], mark[1])}
              </mark>
              {arr.length-1 === i && string.substring(marks[marks.length-1][1])}
            </span>
          )})}
        </td>)
      : (<td>
          {string}
        </td>);

    return td;
  }
  render() {
    const suggestions = Object.keys(this.props.words).map((word, i) => {
      return (
        <tr key={i+1} >
          {this.wordCell({
            'string': word,
            'marks': this.props.words[word].lexemeMarks
          })}
          {this.wordCell({
            'string': this.props.words[word].definition,
            'marks': this.props.words[word].glossMarks
          })}
          <td>
            <button className="btn add" onClick={() => this.addDefinition(word)}>
              +
            </button>
          </td>
        </tr>
      )
    });
    return (
      <div className="word-list word-suggestions">
        <h3>Search Results</h3>
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
        {this.props.totalSuggestions === 0 &&
          <div className="no-results">
            <p>No results found.</p>
            {!this.props.userOptions.isFlexiSearch &&
              <div>
                <p>You might like to try FlexiSearch by activating the switch beneath the search bar.</p>
                <p>This will try to match characters that are commonly misspelt or misheard such as n, ṉ, and ŋ.</p>
              </div>
            }
          </div>
        }
      </div>
    );
  }
}

export default WordSuggestions;
