import request from 'supertest';
import { describe, expect, test } from '@jest/globals';
import { app } from '../src/app';

let elementId: string; // store the id of the created user in the db
const testEmail: string = "test2@gmail.com";

describe('Check endpoints', () => {
    test('should return home page', async () => {
        await request(app)
        .get('/')
        .expect("Content-Type", /text/)
        .expect(200)
        .then((res) => {
            expect(res.text).toBe("Server running on http://localhost:3000");
        });
    });

    test('should create user', async () => {
        await request(app)
        .post('/users')
        .expect("Content-Type", /json/)
        .send({
            "email": testEmail,
            "password": "pass"
        })
        .expect(201)
        .then((res) => {
            expect(res.body.data).toBeTruthy();
            expect(res.body.data.length).toEqual(1);
            expect(res.body.data[0].email).toBe(testEmail);
            elementId = res.body.data[0].id;
        });
    });

    describe('Check Post middleware', () => {
        test('should return email already exists', (done) => {
            request(app)
            .post('/users')
            .expect("Content-Type", /json/)
            .send({
                "email": testEmail,
                "password": "pass"
            })
            .expect(400, {
                error: "Email already exists"
            })
            .end((err) => {
                if (err) return done(err);
                return done();
            });
        });
    });

    test('should get proper user', async () => {
        await request(app)
        .get(`/user/${elementId}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
            expect(res.body.email).toBe(testEmail);
            expect(res.body.id).toBe(elementId);
        });
    });

    test('should update whole record (PUT)', async () => {
        await request(app)
        .put(`/user/${elementId}`)
        .expect("Content-Type", /json/)
        .send({
            email: "pip@pep.com",
            password: "string"
        })
        .expect(200)
        .then((res) => {
            expect(res.body).toBeTruthy();
            expect(res.body.email).toBe("pip@pep.com");
            expect(res.body.id).toBe(elementId);
        });
    });

    test('should update part of the record (PATCH)', async () => {
        await request(app)
        .patch(`/user/${elementId}`)
        .expect("Content-Type", /json/)
        .send({
            lastName: "Franco"
        })
        .expect(200)
        .then((res) => {
            expect(res.body).toBeTruthy();
            expect(res.body.lastName).toBe("Franco");
        });
    });

    test('should delete user', async () => {
        await request(app)
        .delete(`/user/${elementId}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
            expect(res.body.message).toBe("User successfully deleted");
        });
    });
});