import { rockPaperScissors } from "../src/rockPaperScissors";
import each from "jest-each";

describe("RockPaperScissors game works", () => {
    test("Same choice is a draw", () => {
        expect(rockPaperScissors("R", "R")).toBe("Computer chose Rock. Draw. Nobody wins");
    });

    each(["Rock", " ", ""])
    .test("Input is not an option and, thus, is invalid", (invalidInput) => {
        expect(rockPaperScissors(invalidInput, "S")).toBe("Wrong input bud");
    });
});

describe("You win", () => {
    each([["R", "S", "Scissors"], ["P", "R", "Rock"], ["S", "P", "Paper"]])
    .test('You pick %s, computer picks %s. You win', (a: string, b: string, expected: string) => {
        expect(rockPaperScissors(a, b)).toBe(`Computer chose ${expected}. You win!`);
    });
});

describe("Computer wins", () => {
    each([["S", "R", "Rock"], ["R", "P", "Paper"], ["P", "S", "Scissors"]])
    .test('Computer picks %s, you pick %s. Computer wins', (a: string, b: string, expected: string) => {
        expect(rockPaperScissors(a, b)).toBe(`Computer chose ${expected}. Computer wins`);
    });
});