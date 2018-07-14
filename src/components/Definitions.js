import React, { Component } from 'react';

class Definitions extends Component {
  listDefinitions(words) {
    const list = Object.keys(words).map((word, i) => {
      return this.newRow(word, i+1);
    });
    if (this.props.userOptions.sortAZ) {
      return list.sort((a, b) => a.props.name.localeCompare(b.props.name));
    } else {
      return list.sort((a, b) => a.key - b.key);
    }
  }
  newRow(word, i) {
    return (
      <tr key={i} name={word}>
        <td>{word}</td>
        <td>{this.props.words[word]}</td>
        <td>
          <button className="btn remove" onClick={() => this.removeWord(word)}>
            -
          </button>
        </td>
      </tr>
    )
  }
  removeWord(word) {
    this.props.removeDefinition(word)
  }
  render() {
    if (Object.keys(this.props.words).length > 0) {
      return (
        <div className="definitions">
          <h3>Definitions</h3>
          <table>
            <thead>
              <tr>
                <th>Yolŋu Matha</th>
                <th>English</th>
              </tr>
            </thead>
            <tbody>
              {this.listDefinitions(this.props.words)}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="definitions">
          <h3>Definitions</h3>
        </div>
      )
    }

  }

}

export default Definitions;
