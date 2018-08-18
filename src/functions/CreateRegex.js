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
        case 'i':
        case 'e':
          returnStr = '[ie]'
          break;
        case 'u':
        case 'o':
          returnStr = '[uo]'
          break;
        case 'b':
        case 'p':
          returnStr = '[bp]'
          break;
        case 'd':
        case 'ḏ':
        case 't':
        case 'ṯ':
          returnStr = '[dḏtṯ][hy]*'
          break;
        case 'g':
        case 'k':
          returnStr = '[gk]+'
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
          if (arr[i-1] === 'd' || arr[i-1] === 'n' || arr[i-1] === 't' ) {
            returnStr = `${char}*`
          } else {
            returnStr = `${char}`
          }
          break;
        case 'j':
          if (arr[i-1] === 'd' || arr[i-1] === 't' ) {
            returnStr = `${char}`
          } else {
            returnStr = '[dt]j'
          }
          break;
        case 'y':
          if (arr[i-1] === 'n' ) {
            returnStr = `${char}*`
          } else {
            returnStr = `${char}`
          }
          break;
        default:
          returnStr = char;
      }
      return returnStr;
    }).join('')
  }
  return new RegExp(`${fuzzyString || cleanInput}`, 'ig');
}

export default createRegex
