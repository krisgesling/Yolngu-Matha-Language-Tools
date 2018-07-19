import React, { Component } from 'react';

class Definitions extends Component {
  newRow(word, i) {
    return (
      <tr key={i} name={word}>
        <td>{word}</td>
        <td>{this.props.words[word]}</td>
        <td>
          <button className="btn remove" onClick={() => this.removeWord(word)}>
            +
          </button>
        </td>
      </tr>
    )
  }
  removeWord(word) {
    this.props.removeDefinition(word)
  }
  toggleSort(prevState) {
    let newObj = {'userOptions': {}}
    newObj.userOptions.sortAZ = prevState ? false : true;
    this.props.updateState(newObj);
  }
  render() {
    const list = Object.keys(this.props.words).map((word, i) => {
      return this.newRow(word, i+1);
    });
    const isSorted = this.props.userOptions.sortAZ;
    const sortedList = isSorted
      ? list.sort((a, b) => a.props.name.localeCompare(b.props.name))
      : list.sort((a, b) => a.key - b.key);
    return (
      <div className="definitions">
        <h3>My Definitions</h3>
        <div>
          <button
            title='Sort A-Z'
            className={`btn minimenu ${isSorted ? 'sorted' : ''}`}
            onClick={() => this.toggleSort(isSorted)}
          >▼</button>
        </div>
        {sortedList.length > 0 &&
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
        }
      </div>
    );
  }
}

export default Definitions;
