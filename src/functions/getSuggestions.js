import dictionary from '../data/dictionary.js'
import createRegex from './CreateRegex.js'

function getSuggestions({inputWord, userOptions}) {
  const regex = createRegex({
    'cleanInput': inputWord.toLowerCase(),
    'isFlexiSearch': userOptions.isFlexiSearch
  });

  const suggestionList = inputWord.length > 0
    ? Object.keys(dictionary)
      .filter(word => {
        // Create localRegex's to prevent .exec from overwriting .lastIndex
        const localRegex = new RegExp(regex);
        return (userOptions.searchYolngu && localRegex.test(word))
          || (userOptions.searchEnglish && localRegex.test(dictionary[word].En));
      }).map((word, i) => {
        const localRegex = new RegExp(regex);
        if (localRegex.test(word)) {
          const localRegex = new RegExp(regex);
          let localRegexArr;
          let marks = [];
          while ((localRegexArr = localRegex.exec(word)) !== null) {
            marks.push([localRegexArr.index, localRegex.lastIndex])
          }
          return {
            'word': word,
            'lexemeMarks': marks,
            'weight': marks[0][0] / word.length / -1
          }
        } else {
          const localRegex = new RegExp(regex);
          let localRegexArr;
          let marks = [];
          while ((localRegexArr = localRegex.exec(dictionary[word].En)) !== null) {
            marks.push([localRegexArr.index, localRegex.lastIndex])
          }
          return {
            'word': word,
            'glossMarks': marks,
            'weight': marks[0][0] / dictionary[word].En.length / -1
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
      suggestions[suggestion.word] = {
        'definition': dictionary[suggestion.word].En,
        'lexemeMarks':  suggestion.lexemeMarks ? suggestion.lexemeMarks : [],
        'glossMarks':  suggestion.glossMarks ? suggestion.glossMarks : []
      };
    })
  }
 return {
   'suggestions': suggestions,
   'totalSuggestions': inputWord.length > 0 ? suggestionList.length : null
 };
}

export default getSuggestions
