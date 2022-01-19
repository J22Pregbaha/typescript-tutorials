let options: string[] = ["R", "P", "S"];

export function rockPaperScissors(choice: string, randomOption: string) : string {
    let response: string = "Error";
    
    if (choice == randomOption) {
        response = "Draw. Nobody wins";
    } else if (choice == "R" && randomOption == "P"
    || choice == "P" && randomOption == "S"
    || choice == "S" && randomOption == "R") {
        response = "Computer wins";
    } else if (choice == "R" && randomOption == "S"
    || choice == "P" && randomOption == "R"
    || choice == "S" && randomOption == "P") {
        response = "You win!";
    }

    return `Computer chose ${randomOption}. ${response}`;
}

let randomIndex: number = Math.floor(Math.random() * options.length);
let randomOption: string = options[randomIndex];
console.log(rockPaperScissors("R", randomOption));