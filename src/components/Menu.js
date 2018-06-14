import React, { Component } from 'react';
import Mailchimp from 'react-mailchimp-form';

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
    this.toggleOption = this.toggleOption.bind(this);
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
    const newState = this.state.menuItemActive === targetItemClass
      ? '' : targetItemClass;
    this.setState(prevState => ({
      'menuItemActive': newState
    }));
  }
  toggleOption(e) {
    const key = e.target.id.slice(12);
    let newObj = {'userOptions': {}}
    newObj.userOptions[key] = this.props.userOptions[key] ? false : true;
    this.props.updateState(newObj);
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
        <span>Like what you see?</span>
        <span>Want to hear about future releases and tools?</span>
        <Mailchimp
          action='https://gez.us18.list-manage.com/subscribe/post?u=324f4981c0e92001a286327ba&amp;id=57c91f5453'
          className="mailchimp-subscribe"
          fields={[
            {
              name: 'EMAIL',
              placeholder: 'Email',
              type: 'email',
              required: true
            }
          ]}
        />

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
          <div className="switch-container">
            <span className="label">Sort A-Z</span>
            <label className="switch" >
              <input
                id="user-option-sortAZ"
                type="checkbox"
                checked={this.props.userOptions.sortAZ}
                onChange={this.toggleOption}/>
              <span className="slider round"></span>
            </label>
          </div>
        </section>
        <section className={this.setItemClassName('contact')}>
          <h3 onClick={this.toggleMenuItem}>Contact</h3>
          <div className="profile-container">
            <img src="https://media.licdn.com/dms/image/C4D03AQGAuOSxlkKDZw/profile-displayphoto-shrink_200_200/0?e=1534377600&v=beta&t=lgh3bV6R9Hc-Gda6ZCG6CovUSOR92R0bLWGbW4a95M0" alt="Kris Gesling" />
            <p>Email me at <a href="mailto:hi@gez.bz">hi@gez.bz</a> or shout at me <a href="https://www.twitter.com/krisgesling" target="_blank" rel="noopener noreferrer">@krisgesling</a>.</p>
            <p>Hi, I'm Kris. I've been making this tool for the last few months. Always interested to hear if you find it useful or to chat if you have ideas to make it better.</p>
          </div>
        </section>
      </div>
    )
  }
}

export default Menu;
