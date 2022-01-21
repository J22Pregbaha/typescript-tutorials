"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rockPaperScissors = void 0;
let options = ["R", "P", "S"];
function rockPaperScissors(choice, randomOption) {
    let response = "Error";
    if (choice == randomOption) {
        response = "Draw. Nobody wins";
    }
    else if (choice == "R" && randomOption == "P"
        || choice == "P" && randomOption == "S"
        || choice == "S" && randomOption == "R") {
        response = "Computer wins";
    }
    else if (choice == "R" && randomOption == "S"
        || choice == "P" && randomOption == "R"
        || choice == "S" && randomOption == "P") {
        response = "You win!";
    }
    return `Computer chose ${randomOption}. ${response}`;
}
exports.rockPaperScissors = rockPaperScissors;
let randomIndex = Math.floor(Math.random() * options.length);
let randomOption = options[randomIndex];
console.log(rockPaperScissors("R", randomOption));
//# sourceMappingURL=rockPaperScissors.js.map