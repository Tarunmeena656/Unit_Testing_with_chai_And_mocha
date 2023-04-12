const chai = require('chai');
const { assert, expect } = chai;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../src/app');
const db = require('../src/models');
const Post = db.post;
const User = db.user;



chai.use(chaiHttp);

describe('User API Unit Testing', function () {

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjgxMjE4MDU0LCJleHAiOjE2ODEyMjQwNTR9.sxL5SnXpR50tw1F24rUzWM5B6y8Ex3ypa7rjrZi5k3w'

    let id = 1;

    before((done) => {
        User.destroy({
            where: {},
            force: true
        });
        done();
    });


    context('get all users', function () {

        it('should get all users', function (done) {

            chai.request(server)
                .get('/users')
                .auth(token, { type: 'bearer' })
                .end((err, response) => {
                    if (err) {
                        done(err);
                    } else {
                        response.should.have.status(200);
                        response.body.should.be.an('array');
                        expect(response.body[0].fullname).to.be.equals('shoail khan');

                        done();
                    }
                })
        })
    })

    context('get User By Id', function () {

        it('should get a particular user', function (done) {
            chai.request(server)
                .get('/users/' + id)
                .auth(token, { type: 'bearer' })
                .end((err, res) => {
                    if (err) done(err);

                    expect(res).to.have.status(200);
                    // expect(res.body).to.be.an('object');
                    // expect(res.body).to.have.all.keys('id', 'first_name', 'email', 'role', 'comments', 'posts');
                    // expect(res.body).to.have.property('posts').to.be.an('array');
                    // expect(res.body).to.have.property('comments').to.be.an('array')

                    done();
                })

        })
    })

    context.skip('update User', function () {

        it('should update a user', function (done) {
            chai.request(server)
                .put('/users/update/' + id)
                .auth(token, { type: 'bearer' })
                .send({ last_name: 'ali khan' })
                .end((err, res) => {
                    if (err) done(err);

                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');

                    done();
                })

        })
    })

    context.skip('delete User', function () {

        it('should delete a user', function (done) {
            chai.request(server)
                .delete('/users/delete/' + id)
                .auth(token, { type: 'bearer' })
                .end((err, res) => {
                    if (err) done(err);

                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.be.property('msg', 'User Deleted Successfully').to.be.string;

                    done();
                })

        })
    })



 
})