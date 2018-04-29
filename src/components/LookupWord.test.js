import React from 'react';
import ReactDOM from 'react-dom';
import lookupWord from './LookupWord';

it('Returns a definition string', () => {
  expect(lookupWord('-guŋ')).toEqual('from')
  expect(lookupWord('njadsgkner')).toEqual('')
});
