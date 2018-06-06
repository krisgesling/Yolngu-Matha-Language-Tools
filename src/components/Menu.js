import React, { Component } from 'react';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'menuActive': '',
      'menuItemActive': ''
      // TODO toggle each section to expand
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleMenuItem = this.toggleMenuItem.bind(this);
    this.setItemClassName = this.setItemClassName.bind(this);
  }
  toggleMenu(e) {
    const toggleActive = this.state.menuActive === ''
      ? 'active' : '';
    this.setState(prevState => ({
      'menuActive': toggleActive
    }));
  }
  toggleMenuItem(e) {
    const targetItemClass = e.target.parentElement.classList[0];
    console.log('target: ', targetItemClass);
    console.log('state: ', this.state.menuItemActive);
    console.log('equal: ', this.state.menuItemActive === targetItemClass);
    const newState = this.state.menuItemActive === targetItemClass
      ? '' : targetItemClass;
    this.setState(prevState => ({
      'menuItemActive': newState
    }));
  }
  setItemClassName(baseClass) {
    return this.state.menuItemActive === baseClass
      ? `${baseClass} active`
      : baseClass;
  }
  render() {
    return (
      <div className={`menu ${this.state.menuActive}`}>
        <div className={`btn-hamburger ${this.state.menuActive}`} onClick={this.toggleMenu} >
          <div className="ham-bar1"></div>
          <div className="ham-bar2"></div>
          <div className="ham-bar3"></div>
        </div>
        <button className="btn-tour">Take a tour</button>
        <section className={this.setItemClassName('about')}>
          <h3 onClick={this.toggleMenuItem}>About</h3>
          <p>Type in Yolŋu matha characters without a custom keyboard.</p>
          <p>Just type ';' then the corresponding key.</p>
          <table>
            <thead>
              <tr>
                <th>Lowercase</th><th>Uppercase</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>a = ä</td><td>A = Ä</td>
              </tr>
              <tr>
                <td>d = ḏ</td><td>D = Ḏ</td>
              </tr>
              <tr>
                <td>j = ŋ</td><td>J = Ŋ</td>
              </tr>
              <tr>
                <td>l = ḻ</td><td>L = Ḻ</td>
              </tr>
              <tr>
                <td>n = ṉ</td><td>N = Ṉ</td>
              </tr>
              <tr>
                <td>t = ṯ</td><td>T = Ṯ</td>
              </tr>
            </tbody>
          </table>
          <p>The full dictionary is not publicly available at this time.</p>
        </section>
        <section className={this.setItemClassName('options')}>
          <h3 onClick={this.toggleMenuItem}>Options</h3>

          <span className="label">Sort A-Z</span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </section>
        <section className={this.setItemClassName('contact')}>
          <h3 onClick={this.toggleMenuItem}>Contact</h3>
          <p>Random content></p>
          <p>Random content></p>
          <p>Random content></p>
          <p>Random content></p>
          <p>Random content></p>
          <p>Random content></p>
        </section>
      </div>
    )
  }
}

export default Menu;
