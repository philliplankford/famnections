const puzzle = {
    author: "YOUR NAME HERE",
    connections: {
        "yellow": "3's",
        "green": "Types of Traps",
        "blue": "___ Of God",
        "purple": "New"
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

const unimoji = {
    "yellow": "&#129000;",
    "green": "&#129001;",
    "blue": "&#128998;",
    "purple": `&#129002;`
}

/* SELECTORS */
const grid = document.querySelector('#game-grid');
const guess = document.querySelector('#guesses');
const copy = document.querySelector("#copybtn");
const home = document.querySelector("#home");
const overlay = document.querySelector("#overlay");
const emojigrid = document.querySelector("#emojigrid");
const authorname = document.querySelector("#authorname");

/* VARIABLES */
let words = Object.keys(puzzle.key);
let selection = [];
let mistakes = 4;

let history = [];

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

const clearAllComponents = (classname) => {
    document.querySelectorAll(classname).forEach((e) => { e.remove(); });
};

const createSolutionBox = (color, wordstring) => {
    let solution = document.createElement("div");
    let con = document.createElement("p");
    let pieces = document.createElement("p");

    con.textContent = puzzle.connections[color];
    con.classList.add('stronk');
    pieces.textContent = wordstring;
    solution.appendChild(con);
    solution.appendChild(pieces);
    solution.classList.add('solution-box', `${color}`);
    return solution
};

const logEmojis = () => {
    const moji = document.createElement("p");
    let str = "";
    selection.forEach((word) => {
        str += unimoji[puzzle.key[word]] + ' ';
    });
    moji.innerHTML = str;
    emojigrid.appendChild(moji);
};

const solve = () => {
    // which color is being solved atm
    const color = puzzle.key[selection[0]];
    // removing each word from the active array
    selection.forEach((word) => {
        const ind = words.findIndex((e) => e === word);
        words.splice(ind,1);
    });

    clearAllComponents(".word-box");
    const wordstring = `${selection[0]}, ${selection[1]}, ${selection[2]}, ${selection[3]}`;
    const solution = createSolutionBox(color, wordstring);
    grid.appendChild(solution);

    appendWords();
    selection = [];

    if (document.getElementsByClassName("word-box").length === 0) {
        overlayCheck();
        revealAuthor();
    };
};

const logMistake = () => {
    mistakes--;
    document.querySelectorAll(".guess-dot").forEach((e) => { e.remove(); })
    appendGuesses();
    console.log("try again...");
    if (mistakes === 0) {
        showSolutions();
        overlayCheck();
        revealAuthor();
    };
};

const checkConnection = () => {
    if (selection.length === 4) {
    logEmojis();
    const colormatches = countSelection();
    if (Object.keys(colormatches).length === 2) {
        console.log("One away...");
        logMistake();
    } else if (Object.keys(colormatches).length === 1) {
        solve();
        console.log(`you found ${puzzle.connections[Object.keys(colormatches)[0]]}!`);
    } else { 
        logMistake();    
    }
}

};

const appendWords = () => {
    shuffle(words).forEach((word) => {
        let box = document.createElement("div");
        box.textContent = word;
        box.classList.add('word-box');
        grid.appendChild(box);
    });
};

const appendGuesses = () => {
    for (let i=0; i < mistakes; i++) {
        const dot = document.createElement("li");
        dot.classList.add("guess-dot");
        guess.appendChild(dot);
    }
};

const overlayCheck = () => {
    if(overlay.classList.contains('hidden')) {
        overlay.classList.remove("hidden");
    } else {overlay.classList.add("hidden"); 
    }
};

const showSolutions = () => {
    clearAllComponents(".word-box");
    Object.keys(puzzle.connections).forEach((color) => {
        const wordArr = Object.keys(puzzle.key).filter(key => puzzle.key[key] === color);
        const wordString = wordArr.join(", ");
        const solutionBox = createSolutionBox(color,wordString);
        grid.appendChild(solutionBox);
    });
};

const revealAuthor = () => {
    authorname.textContent = puzzle.author;
};

/* PROGRAM */
appendWords();

/* LISTENERS */
grid.addEventListener('click', (e) => {
    if (mistakes > 0) {
        if (e.target.className == "word-box" && !e.target.classList.contains('selected') && selection.length !== 4){
            if (selection.length <= 4) {
                selection.push(e.target.textContent);
                e.target.classList.add('selected');
                checkConnection();
            }
        } else if (e.target.classList.contains('selected')) {
            e.target.classList.remove('selected')
            let ind = selection.findIndex((element) => element === e.target.textContent);
            selection.splice(ind, 1);
        }
    }
});

home.addEventListener('click', (e) => {
    overlayCheck();
});