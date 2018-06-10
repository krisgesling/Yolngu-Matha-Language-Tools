import dictionary from '../data/dictionary.js'

function lookupWord(inputWord) {
  const cleanInput = inputWord.toLowerCase();
  let multiWord = false;
  const regex = new RegExp(`.*${cleanInput}.*`);
  const suggestionList = cleanInput.length > 0
    ? Object.keys(dictionary).filter((word, i) => {
      if (word.substr(0, cleanInput.length).toLowerCase() === cleanInput) {
        if (!multiWord && word.indexOf(' ')>0 && word!==cleanInput) { multiWord = true }
        return true
      } else return regex.test(dictionary[word].En);
    })
    : [];

  let suggestions = {};
  if (suggestionList.length !== 1 &&
    suggestionList[0] !== cleanInput) {
    suggestionList.slice(0,8).forEach((word) => {
      suggestions[word] = dictionary[word].En;
    })
  }
  const definition = (dictionary[cleanInput])
    ? dictionary[cleanInput].En
    : ''
  const lexeme = (dictionary[cleanInput])
    ? cleanInput
    : ''
 return {
   'word': lexeme,
   'definition': definition,
   'suggestions': suggestions,
   'multiWord': multiWord
 };
}

export default lookupWord
