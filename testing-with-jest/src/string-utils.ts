const isPalindrome = (string: string): boolean => string == string.split('').reverse().join('');

const isAnagram = (w1: string, w2: string): boolean => {
    const regularize = (word: string): string => word.toLowerCase().split('').sort().join('').trim();

    return regularize(w1) == regularize(w2);
}

export {isPalindrome, isAnagram};