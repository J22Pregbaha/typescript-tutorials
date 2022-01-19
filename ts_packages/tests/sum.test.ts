import { sum } from '../src/sum';

describe("Test sum function", () => {
    test('add 1 + 2 should equal 3', () => {
        expect(sum(1, 2)).toEqual(3);
    });

    test('add 4 + 1 should equal 5', () => {
        expect(sum(4, 1)).toEqual(5);
    });
})