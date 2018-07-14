import React, { Component } from 'react';

class Definitions extends Component {
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
    const list = Object.keys(this.props.words).map((word, i) => {
      return this.newRow(word, i+1);
    });
    const sortedList = this.props.userOptions.sortAZ
      ? list.sort((a, b) => a.props.name.localeCompare(b.props.name))
      : list.sort((a, b) => a.key - b.key)
    return (
      <div className="definitions">
        <h3>My Definitions</h3>
        <table>
          <thead>
            <tr>
              <th>Yolŋu Matha</th>
              <th>English</th>
            </tr>
          </thead>
          <tbody>
            {sortedList}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Definitions;
