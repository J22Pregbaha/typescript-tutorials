import Deb from '../src/test-mock';
import { describe, expect, test, jest, afterEach } from '@jest/globals';

// const mockedTest = jest.spyOn(Deb, 'check');

describe('spy', () => {
    afterEach(() => {    
        jest.clearAllMocks();
    });

    test('test partial mock', () => {
        // mockedTest.mockImplementation(() => 'Don\'t Watch me boss');
        Deb['check'] = jest.fn(() => 'Don\'t Watch me boss');
    
        const check = Deb.check();
    
        expect(check).toBe('Don\'t Watch me boss');
    });
});