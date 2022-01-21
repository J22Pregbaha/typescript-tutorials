"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rockPaperScissors_1 = require("../src/rockPaperScissors");
describe("RockPaperScissors game works", () => {
    test("Same choice is a draw", () => {
        expect((0, rockPaperScissors_1.rockPaperScissors)("R", "R")).toMatch("Computer chose R. Draw. Nobody wins");
    });
    test("You win", () => {
        expect((0, rockPaperScissors_1.rockPaperScissors)("R", "S")).toBe("Computer chose S. You win!");
    });
    test("Computer wins", () => {
        expect((0, rockPaperScissors_1.rockPaperScissors)("S", "R")).toBe("Computer chose R. Computer wins");
    });
});
/* Obviously there should be more test cases but you get the gist */ 
//# sourceMappingURL=rockPaperScissors.test.js.map