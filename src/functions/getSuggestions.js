import dictionary from '../data/dictionary.js'
import createRegex from './CreateRegex.js'

// TODO result highlight can be found with
// regex.exec.index through to
// index+regex.exec[0].length
function getSuggestions({inputWord, userOptions}) {
  const regex = createRegex({
    'cleanInput': inputWord.toLowerCase(),
    'isFlexiSearch': userOptions.isFlexiSearch
  });

  const suggestionList = inputWord.length > 0
    ? Object.keys(dictionary)
      .filter(word => {
        return (userOptions.searchYolngu && regex.test(word))
          || (userOptions.searchEnglish && regex.test(dictionary[word].En));
      }).map((word, i) => {
      if (regex.test(word)) {
        return {
          'word': word,
          'weight': regex.exec(word).index / word.length / -1
        }
      } else if (regex.test(dictionary[word].En)) {
        return {
          'word': word,
          'weight': regex.exec(dictionary[word].En).index / dictionary[word].En.length / -1
        }
      }
    })
    : [];
  suggestionList.sort((a,b) => {
    return b.weight - a.weight;
  });
  let suggestions = {};
  if (suggestionList.length > 0) {
    suggestionList.slice(0,16).forEach((suggestion) => {
      suggestions[suggestion.word] = dictionary[suggestion.word].En;
    })
  }
 return {
   'suggestions': suggestions,
   'totalSuggestions': inputWord.length > 0 ? suggestionList.length : null
 };
}

export default getSuggestions
