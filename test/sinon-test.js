const Myclass = require('../src/sinon-func');
const myobj = new Myclass();
const chai = require('chai');
const { assert, expect } = chai;
const should = chai.should()
const sinon = require('sinon')
const chaiPromise = require('chai-as-promised');
const chaiHttp = require('chai-http')
chai.use(chaiPromise);
chai.use(chaiHttp);



describe.skip('sinon test', function () {
    it('test add func', function () {
        expect(myobj.add(1, 2)).to.be.equal(3);
    })
    it('test add count', function () {
        const spy = sinon.spy(myobj, 'add');
        myobj.callanotherfunc(10, 20);
        // sinon.assert.calledThrice(spy);
        expect(spy.calledOnce).to.be.true;
    })
    it('test callback ', function () {
        const callback = sinon.spy();
        myobj.callthecallback(callback);
        expect(callback.calledOnce).to.be.true;
    }),
        it('mock sinon', function () {
            const mock = sinon.mock(myobj);
            const expectation = mock.expects('sayHello')
            expectation.exactly(1)
            expectation.calledWith()
            myobj.callanotherfunc(10, 20);
            mock.verify();
        })
    it('mock sinon practice', function () {
        const mock = sinon.mock(myobj);
        const expectation = mock.expects('subtract');
        expectation.exactly(2);
        expectation.withExactArgs(3, 1);
        myobj.mockFunc(3, 1);
        mock.verify();
    })
})

// ----------------------------basic stub test-------------------------------

describe.skip('stub testing', function () {
    context('myobj functions', function () {
        it('stub the greetmessage method', () => {
            // arrange
            const stub = sinon.stub(myobj, "greetmessage");
            stub.withArgs('world').returns('goodbye');

            // act
            const result = myobj.greetmessage('world');

            // assert

            expect(result).to.be.equal('goodbye');

        })

    })
})

describe.skip('stub call testing', function () {
    context('myobj functions', function () {
        it('stub the greetmessage method', () => {

            // arrange            
            const stub = sinon.stub(myobj, "greetmessage");
            stub.withArgs('world')
                .onCall(0)
                .returns('goodbye')
                .onCall(1)
                .returns('goodmorning')

            // act
            const result1 = myobj.greetmessage('world');
            const result2 = myobj.greetmessage('world')

            // assert
            expect(result1).to.be.equal('goodbye');
            expect(result2).to.be.equal('goodmorning');

        })

    })
})

// ----------------------------fakefunction-----------------------------------

const obj1 = {}
obj1.prop = function () {
    return 'goodevening'
}

describe.skip('stub fakefunc', () => {
    it('test fakefunct', () => {
        sinon.stub(obj1, 'prop').callsFake(function () {
            return 'goodmorning'
        })
        expect(obj1.prop()).to.be.equal('goodmorning');
    })
})

// ---------------------------callthrough---------------------------------------

const obj = {};
obj.sum = function sum(a, b) {
    return a + b;
};

describe.skip("stub", function () {
    it("should call through", function () {
        sinon
            .stub(obj, "sum")
            .withArgs(2, 2)
            .callsFake(function foo() {
                return "bar";
            });

        obj.sum.callThrough();  // Causes the original method wrapped into the stub to be called 
        // when none of the conditional stubs are matched.
        assert.equal(obj.sum(2, 2), "bar");
        assert.equal(obj.sum(1, 2), 3);
    });
});



// --------------------------------mocks-------------------------------------------


describe.skip('mock testing of method', function () {
    it('mock sinon', function () {
        const mock = sinon.mock(myobj);

        const expectation = mock.expects('sayHello')
        const expectation2 = mock.expects('add');

        expectation.exactly(2)

        expectation2.exactly(2).withExactArgs(10, 20);

        myobj.callanotherfunc(10, 20);

        mock.verify();
    })
})


// -----------------------------promise function testing----------------------------

const newFunc = function () {
    return new Promise((resolve, reject) => {
        setTimeout(resolve({ name: 'shoaib' }), 5000)
    })
}

describe('fucntion which return promise', () => {
    it('newFunc calling', async () => {
        const result = await newFunc();
        expect(result).to.have.property('name');
    })
})


// -------------------------------Api unit testing ---------------------------------------


describe('api testing', () => {
    context('get method', () => {
        describe('fetch All User', () => {
            it('should have users', (done) => {
                chai.request(server).get('/users').end((err, response) => {
                    if (err) {
                        console.log(err)
                    } else {
                        response.should.have.status(200);
                        response.body.should.be.an('array');
                        expect(response.body[0].fullname).to.be.equals('shoaib khan');
                    }
                    done();
                })
            })
        })
    })
})
