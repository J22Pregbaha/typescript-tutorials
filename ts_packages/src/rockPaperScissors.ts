import * as readline from 'readline';
import { stdin, stdout } from 'process';

const rl = readline.createInterface({
    input: stdin,
    output: stdout
});

let options: string[] = ["R", "P", "S"];

const fullOptions = {
    "R": "Rock",
    "P": "Paper",
    "S": "Scissors"
}

export function rockPaperScissors(userChoice: string, computerChoice: string) : string {
    let response: string;

    if (!options.includes(userChoice)) {
        return "Wrong input bud";
    }
    
    if (userChoice == computerChoice) {
        response = "Draw. Nobody wins";
    } else if (userChoice == "R" && computerChoice == "P"
    || userChoice == "P" && computerChoice == "S"
    || userChoice == "S" && computerChoice == "R") {
        response = "Computer wins";
    } else if (userChoice == "R" && computerChoice == "S"
    || userChoice == "P" && computerChoice == "R"
    || userChoice == "S" && computerChoice == "P") {
        response = "You win!";
    }

    return `Computer chose ${fullOptions[computerChoice]}. ${response}`;
}

let randomIndex: number = Math.floor(Math.random() * options.length);
let randomOption: string = options[randomIndex];

rl.question("Choose one: \nR - Rock, P - Paper, S - Scissors\n", (answer: string) => {
    console.log(rockPaperScissors(answer, randomOption));
    rl.close();
});