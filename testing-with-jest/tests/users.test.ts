import axios from 'axios';
import Users from '../src/users/users';
import { describe, expect, test, jest } from '@jest/globals';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Test mocking axios', () => {
    test('should fetch users', () => {
        // Arrange
        const users = [
            {
                "id": 1,
                "first_name": "Miklos",
                "last_name": "Soproni",
                "email": "miklos@gmail.com"
            },
            {
                "id": 2,
                "first_name": "Bennet",
                "last_name": "Otoho",
                "email": "benny@gmail.com"
            },
        ];
    
        mockedAxios.get.mockImplementation(() => Promise.resolve(users));

        // Act
        Users.all().then(res => {
            // Assert
            expect(mockedAxios.get).toHaveBeenCalled();
            expect(res).toEqual(users);
        });
    });
});