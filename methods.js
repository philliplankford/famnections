const colors = ["yellow","green","blue","purple"];
const puzzle = {
    "Author": "YOUR NAME HERE",
    "Yellow": {
        "Connection": "YELLOW CONNECTION HERE",
        "Words": [
            "WORD1",
            "WORD2",
            "WORD3",
            "WORD4"
        ]
    },
    "Green": {
        "Connection": "GREEN CONNECTION HERE",
        "Words": [
            "WORD1",
            "WORD2",
            "WORD3",
            "WORD4"
        ]
    },
    "Blue": {
        "Connection": "BLUE CONNECTION HERE",
        "Words": [
            "WORD1",
            "WORD2",
            "WORD3",
            "WORD4"
        ]
    },
    "Purple": {
        "Connection": "PURPLE CONNECTION HERE",
        "Words": [
            "WORD1",
            "WORD2",
            "WORD3",
            "WORD4"
        ]
    }
    
}
let allWords = [...puzzle.Yellow.Words,...puzzle.Green.Words,...puzzle.Blue.Words,...puzzle.Purple.Words];

//{ 
//color: "yellow",
//word: "word"
//}

// id = color
// 
console.log(puzzle);


// insert each word randomly
// make it a method so people can shuffle
// shuffle just called the original method

// listen for a click on a word box
// on click add the thing to an array
// make word box gray
// on click to a selection find and remove from the array
// when array hits 4 items check if all the classes are the same
// if one away alert one away 
// otherwise "try again"
// guess goes down 1