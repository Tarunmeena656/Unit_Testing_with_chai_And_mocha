const chai = require('chai');
const { assert, expect } = chai;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../src/app');
const db = require('../src/models');
const Post = db.post;
const User = db.user;


chai.use(chaiHttp);

describe('Post API Unit Testing', function () {

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjgxMjE4MDU0LCJleHAiOjE2ODEyMjQwNTR9.sxL5SnXpR50tw1F24rUzWM5B6y8Ex3ypa7rjrZi5k3w'

    let id = 1;

    before((done) => {
        Post.destroy({
            where: {},
            force: true
        });
        done();
    });


    context('createPost', function () {

        it('should create new post', (done) => {
            let Post = {
                title: 'new post',
                description: 'hello this is first post'
            }
            chai.request(server)
            .post('/posts/createpost/')
            .auth(token, { type: 'bearer' })
            .send(Post)
            .end((err, res) => {
                if (err) done(err);

                res.should.have.status(200);
                res.body.should.be.an('object');
                expect(res.body).to.have.keys('id', 'title', 'description', 'userId', 'updatedAt', 'createdAt');

                done();
            })
        })
    })

    context('fetchPost', function () {

        it('get All Post', (done) => {

            chai.request(server)
            .get('/posts/fetchallpost/')
            .auth(token, { type: 'bearer' })
            .end((err, res) => {
                if (err) done(err);

                res.should.have.status(200);
                res.body.should.be.an('array');
                expect(res.body[0]).to.have.property('comments').to.be.an('array');

                done();
            })
        })
    })

    context('updatePost', function () {

        it('should update post', (done) => {

            chai.request(server)
            .put('/posts/update/' + id)
            .auth(token, { type: 'bearer' })
            .send({title: 'updated post'})
            .end((err, res) => {
                if (err) done(err);

                res.should.have.status(200);
                res.body.should.be.an('object');
                expect(res.body).to.have.property('msg', 'post updated successfully');
        
                done();
            })
        })
    })

    context('fetch single post', function () {

        it('should get post By Id', (done) => {

            chai.request(server)
            .get('/posts/getpost/' + id)
            .auth(token, { type: 'bearer' })
            .end((err, res) => {
               
                if (err) done(err);

                res.should.have.status(200);
                res.body.should.be.an('object');
                expect(res.body).to.have.keys('id','title', 'description', 'comments');
                expect(res.body).to.have.property('comments').to.be.an('array');
        
                done();
            })
        })
    })

    context('delete post', function () {

        it('should delete post By Id', (done) => {

            chai.request(server)
            .delete('/posts/delete/' + id)
            .auth(token, { type: 'bearer' })
            .end((err, res) => {
               
                if (err) done(err);

                res.should.have.status(200);
                res.body.should.be.an('object');
                expect(res.body).to.have.property('msg','user deleted').to.be.string;
        
                done();
            })
        })
    })
      
    



})



