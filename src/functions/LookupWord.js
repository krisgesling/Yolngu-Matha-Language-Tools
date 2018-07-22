import dictionary from '../data/dictionary.js'
import createRegex from './CreateRegex.js'

function lookupWord({inputWord, isFlexiSearch}) {
  const cleanInput = inputWord.toLowerCase();
  const regex = createRegex({
    'cleanInput': cleanInput,
    'isFlexiSearch': isFlexiSearch
  });

  // let multiWord = false;

  const suggestionList = cleanInput.length > 0
    ? Object.keys(dictionary).filter((word, i) => {
      return regex.test(word.toLowerCase())
        || regex.test(dictionary[word].En.toLowerCase());
      // if (word.substr(0, cleanInput.length).toLowerCase() === cleanInput) {
      //   // if (!multiWord && word.indexOf(' ')>0 && word!==cleanInput) { multiWord = true }
      //   return true
      // } else return regex.test(dictionary[word].En.toLowerCase());
    })
    : [];

  let suggestions = {};
  if (suggestionList.length > 0) {
    suggestionList.slice(0,16).forEach((word) => {
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
   'totalSuggestions': suggestionList.length
   // 'multiWord': multiWord
 };
}

export default lookupWord
