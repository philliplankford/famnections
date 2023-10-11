const puzzle = {
    author: "YOUR NAME HERE",
    connections: {
        "yellow": "YELLOW CONNECTION HERE",
        "green": "GREEN CONNECTION HERE",
        "blue": "BLUE CONNECTION HERE",
        "purple": "PURPLE CONNECTION HERE"
    },
    key: {
        "trinity": "yellow",
        "triangle": "yellow",
        "triple": "yellow",
        "trifecta": "yellow",
        "mouse": "green",
        "bear": "green",
        "fish": "green",
        "thirst": "green",
        "lamb": "blue",
        "word": "blue",
        "hand": "blue",
        "wrath": "blue",
        "neo": "purple",
        "fresh": "purple",
        "modern": "purple",
        "contemporary": "purple"
    }
};
/* SELECTORS */
const grid = document.querySelector('#game-grid');

/* VARIABLES */
let words = Object.keys(puzzle.key);
let selection = [];

/* METHODS */
const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

const countSelection = () => {
    const counts = {};
    selection.forEach((word) => {
        counts[puzzle.key[word]] = (counts[puzzle.key[word]] || 0) + 1;
    });
    return counts;
};

const checkConnection = () => {
    const colormatches = countSelection();
    if (Object.keys(colormatches).length === 2) {
        console.log("One away...");
    } else if (Object.keys(colormatches).length === 1) {
        console.log(`you found ${puzzle.connections[Object.keys(colormatches)[0]]}!`);
    } else { console.log("try again...")}
};

/* PROGRAM */
shuffle(words).forEach((word) => {
    let box = document.createElement("div");
    box.textContent = word;
    box.classList.add('word-box');
    grid.appendChild(box);
});

grid.addEventListener('click', (e) => {
    if (e.target.className == "word-box" && !e.target.classList.contains('selected')){
        if (selection.length < 4) {
            e.target.classList.add('selected');
            selection.push(e.target.textContent);
        }
        if (selection.length === 4) {
            checkConnection();
        }
    } else {
        e.target.classList.remove('selected')
        let ind = selection.findIndex((element) => element === e.target.textContent);
        selection.splice(ind, 1);
    }
});