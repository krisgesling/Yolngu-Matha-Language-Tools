import dictionary from '../data/dictionary.js'

function getWord({inputWord}) {
  const definition = (dictionary[inputWord])
    ? dictionary[inputWord].En
    : ''
  const lexeme = (dictionary[inputWord])
    ? inputWord
    : ''
 return {
   'word': lexeme,
   'definition': definition,
 };
}

export default getWord
