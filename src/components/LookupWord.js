import dictionary from '../data/dictionary.js'

function lookupWord(inputWord) {
  let sanitizedInputWord = inputWord.toLowerCase();
  let definition
  if (dictionary[0][sanitizedInputWord])
    {definition = dictionary[0][sanitizedInputWord].English}

 return definition;
}

export default lookupWord
