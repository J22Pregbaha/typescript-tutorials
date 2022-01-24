import defaultExport, {bar, foo, chee} from '../src/foo-bar-baz';
import { describe, expect, test, jest } from '@jest/globals';

jest.mock('../src/foo-bar-baz', () => {
    const originalModule: Object = jest.requireActual('../src/foo-bar-baz');

    // Mock the default export and named export 'foo'
    return {
        __esModule: true,
        ...originalModule,
        default: jest.fn(() => 'mocked baz'),
        foo: 'mocked foo'
    };
});

describe('Partial mock test', () => {
    test('should do a partial mock', () => {
        const defaultExportResult = defaultExport();
        expect(defaultExportResult).toBe('mocked baz');
        expect(defaultExport).toHaveBeenCalled();
    
        expect(foo).toBe('mocked foo');
        expect(bar()).toBe('bar');
        expect(chee()).toBe(34);
    });
});