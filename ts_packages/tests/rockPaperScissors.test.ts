import { rockPaperScissors } from "../src/rockPaperScissors";

describe("RockPaperScissors game works", () => {
    test("Same choice is a draw", () => {
        expect(rockPaperScissors("R", "R")).toMatch("Computer chose R. Draw. Nobody wins");
    });

    test("You win", () => {
        expect(rockPaperScissors("R", "S")).toBe("Computer chose S. You win!");
    });

    test("Computer wins", () => {
        expect(rockPaperScissors("S", "R")).toBe("Computer chose R. Computer wins");
    });
});

/* Obviously there should be more test cases but you get the gist */