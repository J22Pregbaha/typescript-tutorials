import request from 'supertest';
import { app } from '../src/app';

let elementId: string; // store the id of the created user in the db
const testEmail: string = "test2@gmail.com";

describe('Check endpoints', () => {
    test('should return home page', (done) => {
        request(app)
        .get('/')
        .expect("Content-Type", /text/)
        .expect(200)
        .expect((res) => {
            res.body = "Server running on http://localhost:3000"
        })
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });

    test('should create user', (done) => {
        request(app)
        .post('/users')
        .expect("Content-Type", /json/)
        .send({
            "email": testEmail,
            "password": "pass"
        })
        .expect(201)
        .expect((res) => {
            res.body.length = 1,
            res.body.data.length = 1,
            res.body.data[0].email = testEmail
        })
        .end((err, res) => {
            if (err) return done(err);
            elementId = res.body.data[0].id;
            return done();
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
            .expect(400)
            .expect((res) => {
                res.body.error = "Email already exists"
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
        });
    });

    test('should get proper user', (done) => {
        request(app)
        .get(`/user/${elementId}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .expect((res) => {
            res.body.email = testEmail,
            res.body.id = elementId
        })
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });

    test('should update whole record (PUT)', (done) => {
        request(app)
        .put(`/user/${elementId}`)
        .expect("Content-Type", /json/)
        .send({
            email: "pip@pep.com",
            password: "string"
        })
        .expect(200)
        .expect((res) => {
            res.body.length = 1,
            res.body.email = "pip@pep.com",
            res.body.id = elementId
        })
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });

    test('should update part of the record (PATCH)', (done) => {
        request(app)
        .patch(`/user/${elementId}`)
        .expect("Content-Type", /json/)
        .send({
            lastName: "Franco"
        })
        .expect(200)
        .expect((res) => {
            res.body.length = 1,
            res.body.lastName = "Franco"
        })
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });

    test('should delete user', (done) => {
        request(app)
        .delete(`/user/${elementId}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .expect((res) => {
            res.body.message = "User successfully deleted";
        })
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });
});