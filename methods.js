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
/* SELECTORS */
const grid = document.querySelector('#game-grid');
const guess = document.querySelector('#guesses')

/* VARIABLES */
let words = Object.keys(puzzle.key);
let selection = [];
let mistakes = 4;

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

const solve = () => {
    const color = puzzle.key[selection[0]];
    selection.forEach((word) => {
        const ind = words.findIndex((e) => e === word);
        words.splice(ind,1);
    });

    let solution = document.createElement("div");
    let con = document.createElement("p");
    let pieces = document.createElement("p");

    con.textContent = puzzle.connections[color];
    con.classList.add('stronk');
    pieces.textContent = `${selection[0]}, ${selection[1]}, ${selection[2]}, ${selection[3]}`;
    solution.appendChild(con);
    solution.appendChild(pieces);
    solution.classList.add('solution-box', `${color}`);
    document.querySelectorAll(".word-box").forEach((e) => { e.remove(); });

    grid.appendChild(solution);

    appendWords();
    selection = [];
};

const logMistake = () => {
    mistakes--;
    document.querySelectorAll(".guess-dot").forEach((e) => { e.remove(); })
    appendGuesses();
    console.log("try again..."); 
};

const checkConnection = () => {
    if (selection.length === 4) {
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