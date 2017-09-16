import React from 'react';
import {shallow} from 'enzyme';
import UserInput from './UserInput.js';

test('Value of user input area always equals state.UserInput', () => {
  const component = shallow( <UserInput /> );

  // let mockValue.mockReturnValueOnce('string')
  //   .mockReturnValueOnce(10)
  //   .mockReturnValueOnce(false)
  //   .mockReturnValue('test');
  // console.log(userInput)

  expect(component.text()).toEqual('');

  component.setState({ 'userInput': 'testing'});

  expect(component.find('p')).toEqual('testing');
});
