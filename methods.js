const puzzle = {
    author: "Caitlin",
    connections: {
        "yellow": "PITTED FRUITS",
        "green": "HOLIDAY DAYS",
        "blue": "TYPES OF SHOE",
        "purple": "___ ROAD"
    },
    key: {
        "PEACH": "yellow",
        "PLUM": "yellow",
        "CHERRY": "yellow",
        "APRICOT": "yellow",
        "CHRISTMAS": "green",
        "BOXING": "green",
        "INDEPENDENCE": "green",
        "MAY": "green",
        "TRAINER": "blue",
        "PUMP": "blue",
        "FLAT": "blue",
        "HEEL": "blue",
        "ROCKY": "purple",
        "COUNTRY": "purple",
        "HIGH": "purple",
        "PIT": "purple"
    }
};

/*
puzzle = {
    "author": "NAME",
    "yellow": {
        connection: "3's",
        words: ["trinity", "triangle", "triple", "trifecta"]
    },
    "green": {
        connection: "Types of Traps",
        words: ["mouse", "bear", "grease", "thirst"]
    }
}
*/
const unimoji = {
    "yellow": "🟨",
    "green": "🟩",
    "blue": "🟦",
    "purple": `🟪`
}

/* SELECTORS */
const grid = document.querySelector('#game-grid');
const guess = document.querySelector('#guesses');
const copy = document.querySelector("#copybtn");
const home = document.querySelector("#home");
const overlay = document.querySelector("#overlay");
const emojigrid = document.querySelector("#emojigrid");
const authorname = document.querySelector("#authorname");
const body = document.querySelector("#body");
const hint = document.querySelector("#hint");

const deselectbtn = document.querySelector("#deselect");
const shufflebtn = document.querySelector("#shuffle");
const submitbtn = document.querySelector("#submit");

/* VARIABLES */
let words = Object.keys(puzzle.key);
let selection = [];
let mistakes = 4;

let history = [];
let shareString = "";
let lines = 0;
/* METHODS */
const fade = (element) => {
    setTimeout(() => {
        element.style.display = 'none';
    }, 2000);
};

const delay = (func, time) => {
    setTimeout(() => {
        func();
    }, time);
}

const displayHint = (text) => {
    hint.textContent = text;
    hint.style.display = 'flex';
    fade(hint);
};

const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

const submit = () => {
    checkConnection();
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
        shareString += unimoji[puzzle.key[word]];
    });
    shareString += "\n"
    moji.innerHTML = str;
    emojigrid.appendChild(moji);
};

const copyEmoji= async () => {
    let text = emojigrid.innerHTML;
    try {
        await navigator.clipboard.writeText(text);
        console.log("Copied!");
    } catch (err) {
        console.log("Failed to copy: ", err);
    }
};

const copyEmojiString = async() =>{
    const mySmartTextarea = document.createElement('textarea');
    shareString = `I completed ${puzzle.author}'s puzzle!\n` + shareString;
    mySmartTextarea.innerHTML = shareString;
    mySmartTextarea.id = "textarea";
    let text = mySmartTextarea.value;
    try {
        await navigator.clipboard.writeText(text);
        copy.textContent = "COPIED!"
        displayHint("Copied!");
    } catch (err) {
        displayHint("Copy Failed: ", err);
    }
    mySmartTextarea.remove();
};

copy.onclick = copyEmojiString;


const deselectAll = () => {
    const selectedElements = document.getElementsByClassName("selected");
    const arrConv = [...selectedElements]
    arrConv.forEach((element) => {
        if (element.classList.contains("selected")) {
            element.classList.remove("selected");
        }
    });
    selection = [];

};

const shuffleAll = () => {
    clearAllComponents(".word-box");
    shuffle(words);
    appendWords();
};

deselectbtn.onclick = deselectAll;
shufflebtn.onclick = shuffleAll;
submitbtn.onclick = submit;

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
        delay(overlayCheck,1500)
        revealAuthor();
    };
};

const logMistake = () => {
    mistakes--;
    document.querySelectorAll(".guess-dot").forEach((e) => { e.remove(); })
    appendGuesses();
    if (mistakes === 0) {
        showSolutions();
        delay(overlayCheck,1500);
        revealAuthor();
    };
};

const checkConnection = () => {
    if (selection.length === 4) {
    logEmojis();
    const colormatches = countSelection();
    if (colormatches[Object.keys(colormatches)[0]] === 3) { 
        // this is checking if there are two color but if u have two groups of two colors it triggers
        displayHint("One away...");
        logMistake();
    } else if (Object.keys(colormatches).length === 1) {
        solve();
    } else { 
        displayHint("Try Again...");
        logMistake();
    }
}

};

const appendWords = () => {
    shuffle(words).forEach((word) => {
        let box = document.createElement("div");
        console.log(`${word} is ${word.length} letters long!`)
        box.textContent = word;
        box.classList.add('word-box');
        if (word.length > 7) {
            box.classList.add('long-word');
        }
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
    clearAllComponents(".solution-box");
    Object.keys(puzzle.connections).forEach((color) => {
        const wordArr = Object.keys(puzzle.key).filter(key => puzzle.key[key] === color);
        const wordString = wordArr.join(", ");
        const solutionBox = createSolutionBox(color,wordString);
        grid.appendChild(solutionBox);
    });
};

const revealAuthor = () => {
    authorname.textContent = "  " + puzzle.author;
};

/* PROGRAM */
appendWords();

/* LISTENERS */
grid.addEventListener('click', (e) => {
    if (mistakes > 0) {
        if (e.target.classList.contains("word-box") && !e.target.classList.contains('selected') && selection.length !== 4){
            if (selection.length <= 4) {
                selection.push(e.target.textContent);
                e.target.classList.add('selected');
                // checkConnection();
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