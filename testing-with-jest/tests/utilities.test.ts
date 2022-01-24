import {sumArray, positive, negative} from '../src/math-utils';
import {isPalindrome, isAnagram} from '../src/string-utils';
import each from "jest-each";
import { describe, expect, test, beforeAll } from '@jest/globals';

describe('Testing math utilities', () => {
    let vals: Array<number>;
    let sum_of_vals: number;
    let pos_vals: Array<number>;
    let neg_vals: Array<number>;

    beforeAll(() => {
        pos_vals = [2, 5, 3];
        neg_vals = [-1, -4, -2];
        vals = pos_vals.concat(neg_vals);
        sum_of_vals = vals.reduce((x: number, y: number) => x + y, 0);
    });

    test('sum should be 3', () => {
        expect(sumArray(vals)).toBe(sum_of_vals);
    });

    test('should get just positive values', () => {
        expect(positive(vals)).toEqual(pos_vals);
    });

    test('should get just negative values', () => {
        expect(negative(vals)).toEqual(neg_vals);
    });
});

describe('Testing string utilities', () => {
    each(["racecar", "radar"])
    .test('%s is a palindrome', (word: string) => {
        expect(isPalindrome(word)).toBeTruthy();
    });

    each([["arc", "car"], ["cat", "act"]])
    .test('%s is an anagram of %s', (w1: string, w2: string) => {
        expect(isAnagram(w1, w2)).toBeTruthy();
    });
});