const chai = require('chai');
const { expect } = chai;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../src/app');
const db = require('../src/models');
const Post = db.post;
const User = db.user;

chai.use(chaiHttp);


describe.skip('User Auth Test', () => {
    context('user signup', () => {
        it("should sign in user", (done) => {
            let user = {
                first_name: "tarun",
                last_name: "khan",
                email: "tarun@gmail.com",
                password: "12345678",
                
            };
            chai
                .request(server)
                .post("/auth/signup")
                .send(user)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    } else {
                        res.should.have.status(200);
                        
                    }
                    done();
                });
        });
    });



    context("user login", () => {
        it("should login user ", (done) => {
            let user = {
                email: "shoail@gmail.com",
                password: "12345678",
            };

            chai
                .request(server)
                .post("/auth/login")
                .send(user)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    } else {
                        expect(res).to.have.status(200);
                        console.log(res.body);
                        done();
                    }
                });
        })
    });
})

