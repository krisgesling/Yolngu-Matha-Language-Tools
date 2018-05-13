import React from 'react';
import ReactDOM from 'react-dom';
import lookupWord from '../LookupWord';

it('Returns a definition string if word exists', () => {
  expect(lookupWord('-guŋ').definition).toEqual('from')
});

it('Returns an empty string if word does not exist', () => {
  expect(lookupWord('njadsgkner').definition).toEqual('')
});

it('Returns array of possible longer words', () => {
  expect(lookupWord('baḏi').suggestions).toEqual(['baḏikan', 'baḏipaḏi'])
});
