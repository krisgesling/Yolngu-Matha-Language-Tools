import dictionary from '../data/dictionary.js'



function lookupWord(inputWord) {

  const sanitizedInputWord = inputWord.toLowerCase();
  const suggestions = sanitizedInputWord.length > 0
    ? Object.keys(dictionary).filter((word) => {
      return word.substr(0, sanitizedInputWord.length).toLowerCase() === sanitizedInputWord
    })
    : []
  const definition = (dictionary[sanitizedInputWord])
    ? dictionary[sanitizedInputWord].En
    : ''
 return {
   'definition': definition,
   'suggestions': (suggestions.length === 1 &&
                   suggestions[0] === sanitizedInputWord)
                   ? [] : suggestions
 };
}

export default lookupWord
