import request from 'supertest';
import { describe, expect, test, jest } from '@jest/globals';
import usersService from '../users/services/users.service';
import { app } from '../src/app';
import { CreateUserDto } from '../users/dto/create.user.dto';

const mockGetUserByEmail = jest.spyOn(usersService, "getUserByEmail");
const mockGetUserById = jest.spyOn(usersService, "readById");

const mockUser: CreateUserDto = {
    id: "1",
    email: "mockEmail@mock.mock",
    password: "mockPassword"
}

mockGetUserByEmail.mockImplementation(() => Promise.resolve(mockUser));

describe('Check middleware before creating user', () => {
    test('Empty json return Missing required fields email and password', async () => {
        await request(app)
        .post('/users')
        .expect("Content-Type", /json/)
        .send({})
        .expect(400)
        .then((res) => {
            expect(res.body.error).toBeTruthy();
            expect(res.body.error).toBe("Missing required fields email and password");
        });
    });

    test('validateEmailDoesNotExist should return email exists', async () => {
        await request(app)
        .post('/users')
        .expect("Content-Type", /json/)
        .send({
            email: mockUser.email,
            password: "check_this_out"
        })
        .expect(400)
        .then((res) => {
            expect(res.body.error).toBeTruthy();
            expect(res.body.error).toBe("Email already exists");
        });
    });
});

describe('Check middleware before specific user tasks', () => {
    test('validateUserExists returns "User 1 not found" if user\'s not found', async () => {
        await request(app)
        .get('/user/1')
        .expect("Content-Type", /json/)
        .expect(400)
        .then((res) => {
            expect(res.body.error).toBeTruthy();
            expect(res.body.error).toBe("User 1 not found");
        });
    });
});

describe('Check middleware before put task', () => {
    test('validateRequiredUserBodyFields returns "Missing required fields email and password" when they\'re missing',
    async () => {
        mockGetUserById.mockImplementation(() => Promise.resolve(mockUser));
        await request(app)
        .put(`/user/${mockUser.id}`)
        .expect("Content-Type", /json/)
        .send({})
        .expect(400)
        .then((res) => {
            expect(res.body.error).toBeTruthy();
            expect(res.body.error).toBe("Missing required fields email and password");
        });
    });

    test('validateSameEmailBelongsToSameUser returns "Email already belongs to this user" if it does',
    async () => {
        await request(app)
        .put(`/user/${mockUser.id}`)
        .expect("Content-Type", /json/)
        .send({
            email: mockUser.email,
            password: "Cheeeee"
        })
        .expect(400)
        .then((res) => {
            expect(res.body.error).toBeTruthy();
            expect(res.body.error).toBe("Email already belongs to this user");
        });
    });
});

describe('Check middleware before patch tasks', () => {
    test('validatePatchEmail returns "Email already belongs to this user" if it does', async () => {
        await request(app)
        .patch(`/user/${mockUser.id}`)
        .expect("Content-Type", /json/)
        .send({
            email: mockUser.email,
            password: "Cheeee"
        })
        .expect(400)
        .then((res) => {
            expect(res.body.error).toBeTruthy();
            expect(res.body.error).toBe("Email already belongs to this user");
        });
    });
});