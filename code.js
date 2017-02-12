//
// this is just a stub for a function you need to implement
//
function match(word) {
    "use strict";
    return word === this;
}

function getStats(txt) {
    "use strict";
    var txtLength = txt.length,
        words = txt.toLowerCase().replace(/\W/g, ' ').trim().split(/\s{1,}/),
        numWords = words.length,
        lines = txt.split('\n'),
        numLines = lines.length,
        numNonEmptyLines = 0,
        maxLLength = 0,
        lineCount,
        wordCount,
        palCount,
        wordSum = 0,
        wordAvg = 0,
        isPal = true,
        pals = [],
        longestWords = [],
        longCount,
        notDupe = true,
        mostFre = [],
        newWord = true,
        mostFreList = [],
        mostFreListCount,
        mostFreFinal = [],
        mostFreFinalCount,
        difWords = [],
        difCount;
    for (lineCount = 0; lineCount < numLines; lineCount += 1) {
        if ((lines[lineCount].trim() === '') === false) {
            numNonEmptyLines += 1;
        }
        if (maxLLength < lines[lineCount].length) {
            maxLLength = lines[lineCount].length;
        }
    }
        
    for (wordCount = 0; wordCount < numWords; wordCount += 1) {
        wordSum += words[wordCount].length;
        for (palCount = 0; palCount < (words[wordCount].length / 2); palCount += 1) {
            if (words[wordCount][palCount] !== words[wordCount][words[wordCount].length - palCount - 1]) {
                isPal = false;
            }
        }
        if (words[wordCount].length < 2) {
            isPal = false;
        }
        if (isPal === true) {
            pals.push(words[wordCount]);
        }
        isPal = true;
        if (longestWords.length < 1) {
            longestWords[0] = words[wordCount];
        } else {
            for (longCount = 0; longCount < longestWords.length; longCount += 1) {
                if (longestWords[longCount] === words[wordCount]) {
                    notDupe = false;
                }
            }
            if (notDupe) {
                if (longestWords.length < 10) {
                    longestWords.push(words[wordCount]);
                } else {
                    if (longestWords[9].length <= words[wordCount].length) {
                        if (longestWords[9].length === words[wordCount].length) {
                            if (longestWords[9] > words[wordCount]) {
                                longestWords.pop();
                                longestWords.push(words[wordCount]);
                            }
                        } else {
                            longestWords.pop();
                            longestWords.push(words[wordCount]);
                        }
                    }
                }
            }
            notDupe = true;
        }
        longestWords.sort(function (a, b) {
            return b.length - a.length || a.localeCompare(b);
        });
        
        for (difCount = 0; difCount < difWords.length; difCount += 1) {
            if (difWords[difCount] === words[wordCount]) {
                newWord = false;
            }
        }
        if (newWord) {
            difWords.push(words[wordCount]);
        }
        newWord = true;
    }
    for (difCount = 0; difCount < difWords.length; difCount += 1) {
        mostFre.push(words.filter(match, difWords[difCount]));
    }
    
    for (mostFreListCount = 0; mostFreListCount < mostFre.length; mostFreListCount += 1) {
        mostFreList.push([mostFre[mostFreListCount][0], mostFre[mostFreListCount].length]);
    }
    
    mostFreList.sort(function (a, b) {
        return b[1] - a[1] || a[0].localeCompare(b[0]);
    });
    
    for (mostFreFinalCount = 0; mostFreFinalCount < 10 && mostFreFinalCount < mostFreList.length; mostFreFinalCount += 1) {
        mostFreFinal.push(mostFreList[mostFreFinalCount][0] + '(' + mostFreList[mostFreFinalCount][1] + ')');
    }
    
    wordAvg = wordSum / numWords;
    longestWords.sort(function (a, b) {
        return b.length - a.length || a.localeCompare(b);
    });
    return {
        nChars: txtLength,
        nWords: numWords,
        nLines: numLines,
        nNonEmptyLines: numNonEmptyLines,
        maxLineLength: maxLLength,
        averageWordLength: wordAvg,
        palindromes: pals,
        longestWords: longestWords,
        mostFrequentWords: mostFreFinal
    };
}