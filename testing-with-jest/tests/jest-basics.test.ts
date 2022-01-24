import {describe, test, jest, expect} from '@jest/globals';
import doAdd from '../src/dependency-injection';
import * as math from '../src/math-utils';
import * as app from '../src/implement-math';

describe('Basics of Jest', () => {
    test('returns undefined by default', () => {
        const mock = jest.fn();

        let result = mock("foo");

        expect(result).toBeUndefined();
        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledWith("foo");
    });

    test('mock implementation', () => {
        // const mock = jest.fn((x: string) => "bar");
        // SAME AS ABOVE
        const mock = jest.fn().mockImplementation(() => "bar");

        expect(mock("foo")).toBe("bar");
        expect(mock).toHaveBeenCalledWith("foo");
    });

    test('mock implementation one time', () => {
        // const mock = jest.fn((x: string) => "bar");
        // SAME AS ABOVE
        const mock = jest.fn().mockImplementationOnce(() => "bar");

        expect(mock("foo")).toBe("bar");
        expect(mock).toHaveBeenCalledWith("foo");

        expect(mock("baz")).toBe(undefined);
        expect(mock).toHaveBeenCalledWith("baz");
    });

    test('mock a return value', () => {
        const mock = jest.fn();
        mock.mockReturnValue("bar");

        expect(mock("foo")).toBe("bar");
        expect(mock).toHaveBeenCalledWith("foo");
    });
});

describe('dependency injection', () => {
    test('calls callback with arguments needed', () => {
        const mockCallback = jest.fn();
        doAdd(1, 2, mockCallback);
        expect(mockCallback).toHaveBeenCalledWith(3);
    });
});

describe('math tests', () => {
    const addMock = jest.spyOn(math, "add");
    const subtractMock = jest.spyOn(math, "subtract");
    const divideMock = jest.spyOn(math, "divide");
    const multiplyMock = jest.spyOn(math, "multiply");
        
    test("calls math.add", () => {
        // Override the original implementation
        addMock.mockImplementation(() => 225);
        expect(app.doAdd(1, 2)).toEqual(225);

        // Restore original implementation
        addMock.mockRestore();
        expect(app.doAdd(1, 2)).toEqual(3);
    });

    test("calls math.subtract", () => {
        subtractMock.mockImplementation(() => 225);
        expect(app.doSubtract(3, 2)).toEqual(225);

        subtractMock.mockRestore();
        expect(app.doSubtract(3, 2)).toEqual(1);
    });

    test("calls math.divide", () => {
        divideMock.mockImplementation(() => 225);
        expect(app.doDivide(4, 2)).toEqual(225);

        divideMock.mockRestore();
        expect(app.doDivide(4, 2)).toEqual(2);
    });

    test("calls math.multiply", () => {
        multiplyMock.mockImplementation(() => 225);
        expect(app.doMultiply(2, 2)).toEqual(225);

        multiplyMock.mockRestore();
        expect(app.doMultiply(2, 2)).toEqual(4);
    });
});