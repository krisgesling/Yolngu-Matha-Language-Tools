import dictionary from '../data/dictionary.js'

function lookupWord(inputWord) {
  const sanitizedInputWord = inputWord.toLowerCase();
  const definition = (dictionary[sanitizedInputWord])
    ? dictionary[sanitizedInputWord].En
    : ''
 return definition;
}

export default lookupWord
