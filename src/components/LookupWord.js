import dictionary from '../data/dictionary.js'

function lookupWord(inputWord) {
  let sanitizedInputWord = inputWord.toLowerCase();
  let definition
  if (dictionary[sanitizedInputWord])
    {definition = dictionary[sanitizedInputWord].En}

 return definition;
}

export default lookupWord
