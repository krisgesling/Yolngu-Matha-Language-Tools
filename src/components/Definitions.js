import React, { Component } from 'react';
// import lookupWord from './LookupWord';

class Definitions extends Component {
  listDefinitions(words) {
    const list = Object.keys(words)
    return list.map((word, i) => {
      return this.createTableRow(word, i+1)
    })
  }
  createTableRow(word, i) {
    return (
      <tr key={i}>
        <td>{word}</td>
        <td>{this.props.words[word]}</td>
      </tr>
    )
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
