// import { author, puzzle }
const colors = ["yellow","green","blue","purple"];
const connections = {
    "yellow": "",
    "green": "",
    "blue": "",
    "purple": ""
}
const puzzle = [
    {"trinity": "yellow"},
    {"triangle": "yellow"},
    {"triple": "yellow"},
    {"trifecta": "yellow"},
    {"mouse": "green"},
    {"bear": "green"},
    {"fish": "green"},
    {"thirst": "green"},
    {"lamb": "blue"},
    {"word": "blue"},
    {"hand": "blue"},
    {"wrath": "blue"},
    {"neo": "purple"},
    {"fresh": "purple"},
    {"modern": "purple"},
    {"contemporary": "purple"}
] // id = index
console.log(puzzle);

const grid = document.querySelector('#game-grid');
let selection = [];

grid.addEventListener('click', (e) => {
    if (e.target.className == "word-box" && !e.target.classList.contains('selected')){
        if (selection.length < 4) {
            e.target.classList.add('selected');
            selection.push(e.target);
            console.log(selection);
        }
    } else {
        e.target.classList.remove('selected')
    }
});

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