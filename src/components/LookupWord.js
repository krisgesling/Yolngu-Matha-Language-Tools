import dictionary from '../data/dictionary.js'

function lookupWord(inputWord) {
  let definition
  if (dictionary[0][inputWord])
    {definition = dictionary[0][inputWord].English}

 return definition;
}

export default lookupWord
