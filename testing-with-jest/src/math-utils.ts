const sumArray = (vals: Array<number>): number => {
    let sum: number = 0;

    vals.forEach((val: number) => {
        sum += val;
    });

    return sum;
}

const positive = (vals: Array<number>): Array<number> => {
    return vals.filter((val: number) => val > 0);
}

const negative = (vals: Array<number>): Array<number> => {
    return vals.filter((val: number) => val < 0);
}

export {sumArray, negative, positive};

// NUMBERS
export const add = (a: number, b: number): number => a + b;
export const subtract = (a: number, b: number): number => a - b;
export const divide = (a: number, b: number): number => a / b;
export const multiply = (a: number, b: number): number => a * b;
