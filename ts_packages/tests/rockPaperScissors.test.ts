import { rockPaperScissors } from "../src/rockPaperScissors";

describe("RockPaperScissors game works", () => {
    test("Same choice is a draw", () => {
        expect(rockPaperScissors("R", "R")).toBe("Computer chose Rock. Draw. Nobody wins");
    });

    test("Input is not an option", () => {
        expect(rockPaperScissors("Rock", "S")).toBe("Wrong input bud");
    });
});

describe("You win", () => {
    test("You win with rock", () => {
        expect(rockPaperScissors("R", "S")).toBe("Computer chose Scissors. You win!");
    });

    test("You win with Paper", () => {
        expect(rockPaperScissors("P", "R")).toBe("Computer chose Rock. You win!");
    });

    test("You win with scissors", () => {
        expect(rockPaperScissors("S", "P")).toBe("Computer chose Paper. You win!");
    });
});

describe("Computer wins", () => {
    test("Computer wins with rock", () => {
        expect(rockPaperScissors("S", "R")).toBe("Computer chose Rock. Computer wins");
    });

    test("Computer wins with Paper", () => {
        expect(rockPaperScissors("R", "P")).toBe("Computer chose Paper. Computer wins");
    });

    test("Computer wins with scissors", () => {
        expect(rockPaperScissors("P", "S")).toBe("Computer chose Scissors. Computer wins");
    });
});