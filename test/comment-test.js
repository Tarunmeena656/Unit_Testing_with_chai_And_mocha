let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/app");
let should = chai.should();
const expect = chai.expect;
const db = require("../src/models");
const comment = db.comment;

chai.use(chaiHttp);

describe("COMMENT API TEST", function () {

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjgxMjE4MDU0LCJleHAiOjE2ODEyMjQwNTR9.sxL5SnXpR50tw1F24rUzWM5B6y8Ex3ypa7rjrZi5k3w'

    const postid = 1

    const id = 1

      before(async function () {
        await comment.destroy({
          where: {},
          force: true
        });
      });


    context("Create Comment", () => {
        it("shoul create a comment", (done) => {
            let comment = {
                comment: "Good"
            };
            chai
                .request(server)
                .post("/comments/" + postid)
                .auth(token, { type: "bearer" })
                .send(comment)
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


    context("fetch all comment", () => {
        it("should fetch all comment ", (done) => {
            chai
                .request(server)
                .get("/comments/")
                .auth(token, { type: "bearer" })
                .end((err, res) => {
                    console.log(res.body)
                    if (err) done(err);


                    res.should.have.status(200);
                    expect(res.body).to.be.a("array");
                    expect(res.body[0]).to.have.keys('id', 'comment', 'user', 'post');
                    expect(res.body[0]).to.have.property('user').to.be.an('object')
                    expect(res.body[0]).to.have.property('post').to.be.an('object')

                    done();
                });
        });
    });


    context("/GET/:id", () => {
        it("should fetch particular comment", (done) => {
            chai
                .request(server)
                .get("/comments/" + id)
                .auth(token, { type: "bearer" })
                .end((err, res) => {
                    if (err) {
                        done(err);
                    } else {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an("object");
                        expect(res.body).to.have.keys('id', 'comment', 'userId', 'postId');

                    }
                    done();
                });
        });
    });


    context(" Udpdate post", () => {
        it("update a post by id ", (done) => {
            chai
                .request(server)
                .put("/comments/update/" + id)
                .auth(token, { type: "bearer" })
                .send({ comment: "hello" })
                .end((err, res) => {
                    if (err) {
                        done(err);
                    } else {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a("object");
                    }
                    done();
                });
        });
    });

    context(" Delete comment", () => {
        it("delete a comment by id ", (done) => {
            chai
                .request(server)
                .delete('/posts/delete/' + id)
                .auth(token, { type: "bearer" })
                .end((err, res) => {
                    if (err) {
                        done(err);
                    } else {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a("object");
                        expect(res.body)
                            .to.have.property('msg', 'Comment Deleted Successfully')
                            .to.be.a("string");
                    }
                    done();
                });
        });
    });
});
