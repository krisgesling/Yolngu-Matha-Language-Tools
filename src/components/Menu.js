import React, { Component } from 'react';
import Mailchimp from 'react-mailchimp-form';
import Icon from './Icon.js';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'menuActive': '',
      'menuItemActive': ''
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
          <h2 onClick={this.toggleMenuItem}>About</h2>
          <div className="accordian">
            <p>This is a work in progress. The full dictionary is not publicly available at this time. Subscribe above for updates!</p>
            <p>You can search the few hundred available words using either Yolŋu Matha or English. These can be searched simultaneously or one at a time using the switches below the search box.</p>
            <p>FlexiSearch allows you to find words without knowing the precise spelling. With this activated the search algorithm will match multiple characters. Typing 'n' for example will match 'n', 'ṉ', 'ŋ', 'nh', or 'ny'.</p>
            <p>You can also type in Yolŋu Matha characters on any device without a custom keyboard installed.</p>
            <p>Simply type ';' then the corresponding key. So to get 'ä' type ';' + 'a'.</p>
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
          </div>
        </section>
        <section className={this.setItemClassName('contact')}>
          <h2 onClick={this.toggleMenuItem}>Contact</h2>
          <div className="accordian profile-container">
            <img className="profile-img" src={require('./assets/profile.jpeg')} alt="Kris Gesling" />
            <p>{`Hi, I'm Kris. I've been making this tool to make my own life easier and I hope you find it helpful too. If you spot something that's not quite right, have ideas to make it better, or want to see another language included - please get in touch.`}</p>
            <div className="social-btn-container">
              <Icon type="email" />
              <Icon type="twitter" />
              <Icon type="github" />
              <Icon type="linkedin" />
              <Icon type="keybase" />
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Menu;
