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
        // Create localRegex's to prevent .exec from overwriting .lastIndex
        const localRegex = new RegExp(regex);
        return (userOptions.searchYolngu && localRegex.test(word))
          || (userOptions.searchEnglish && localRegex.test(dictionary[word].En));
      }).map((word, i) => {
        const localRegex = new RegExp(regex);
        if (localRegex.test(word)) {
          // const regexResult = regex.exec(word);

          const localRegex = new RegExp(regex);
          let localRegexArr;
          let marks = [];
          // if (word === 'baḏuwaḏuyun') console.log('Double result');
          while ((localRegexArr = localRegex.exec(word)) !== null) {
            // if (word === 'baḏubaḏuyun') console.log('Found: ', localRegexArr);
            // regexResults.push(localRegexArr);
            marks.push([localRegexArr.index, localRegex.lastIndex])
            // if (localRegexArr.input === 'yämiṉḏa') console.log('Single result');
            // if (word === 'baḏuwaḏuyun') console.log('Double result');
            // if (word === 'baḏubaḏuyun') console.log('Next match at: ', localRegex.lastIndex);
          }
          // if (word === 'baḏuwaḏuyun') console.log('Results: ', regexResults);

          return {
            'word': word,
            'lexemeMarks': marks,
            'weight': marks[0][0] / word.length / -1
          }
        } else // if (localRegex.test(dictionary[word].En))
        // unneccessary test above as array is already filtered.
        {
          const localRegex = new RegExp(regex);
          let localRegexArr;
          let marks = [];
          while ((localRegexArr = localRegex.exec(dictionary[word].En)) !== null) {
            marks.push([localRegexArr.index, localRegex.lastIndex])
          }
          return {
            'word': word,
            'glossMarks': marks,
            // 'glossMarks': regexResults.map(e => e.index),
            'weight': marks[0][0] / dictionary[word].En.length / -1
            //'weight': localRegex.exec(dictionary[word].En).index / dictionary[word].En.length / -1
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
    // marksList = suggestionList.map(s => s.marks);
  }
 return {
   'suggestions': suggestions,
   'totalSuggestions': inputWord.length > 0 ? suggestionList.length : null
 };
}

export default getSuggestions
