"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sum_1 = require("../src/sum");
describe("Test sum function", () => {
    test('add 1 + 2 should equal 3', () => {
        expect((0, sum_1.sum)(1, 2)).toEqual(3);
    });
    test('add 4 + 1 should equal 5', () => {
        expect((0, sum_1.sum)(4, 1)).toEqual(5);
    });
});
//# sourceMappingURL=sum.test.js.map