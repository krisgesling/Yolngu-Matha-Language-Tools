function createRegex({cleanInput, isFlexiSearch}) {
  let fuzzyString;
  if (isFlexiSearch) {
    fuzzyString = cleanInput.split('').map((char, i, arr) => {
      let returnStr;
      switch (char) {
        case 'a':
        case 'ä':
          returnStr = '[aä]'
          break;
        case 'b':
        case 'p':
          returnStr = '[bp]'
          break;
        case 'd':
        case 'ḏ': //dh dj dy
        case 't': //th tj ty
        case 'ṯ':
          returnStr = '[dḏtṯ][hjy]*'
          break;
        case 'g':
        case 'k':
          returnStr = '[gk]'
          break;
        case 'l':
        case 'ḻ':
          returnStr = '[lḻ]'
          break;
        case 'n': // nh, ny
        case 'ṉ':
        case 'ŋ':
          returnStr = '[nṉŋ][hy]*'
          break;
        case 'r':
          returnStr = 'r+'
          break;
        case 'h':
        case 'y':
          if (arr[i-1] === 'd' || arr[i-1] === 'n') {
            returnStr = `${char}*`
          }
          break;
        case 'j':
          if (arr[i-1] === 'd') {
            returnStr = `${char}*`
          }
          break;
        default:
          returnStr = char;
      }
      return returnStr;
    }).join('')
  }
  return new RegExp(`.*${fuzzyString || cleanInput}.*`);
}

export default createRegex
