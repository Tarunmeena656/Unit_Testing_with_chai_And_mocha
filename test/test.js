const chai = require('chai');
const { assert, expect } = chai;
const should = chai.should();


app =  {
    sayHello: function(){
        return 'hello'
    },
    addNumber: (a,b) => {
        return a+b;
    },
    subtractNumber: (a,b) => {
        return a-b
    },
    isExist: () => {
        return (1===1? true:false)
    }
}



function fetchUser (id) {
    return {
        id: id.toString(),
        name: 'test'
    }
}

function getData (id) {
    console.log("==================+++++> ");
    return fetchUser (id);
}

describe.skip('App.js', function() {
    describe('assert practice', () => {
        it('User Login Test', function() {
            assert.equal(app.sayHello(),'hello');
        })
        it('add number unit test', () => {
            assert.isAbove(app.addNumber(2,3), 4);
        }),
        it('check existence', () => {
            assert.isTrue(app.isExist(), true);
        }),
        it('isOK', () => {
            assert.isOk(1,1, 'done');
        })
    })
    describe('expect practice', () => {
        it('equal', () => {
            expect(app.addNumber(2,3)).to.equal(5);
        }),
        it('deep', () => {
            expect({a: 1}).to.deep.equal({a: 1});
            expect([{a: 1}]).to.deep.include({a: 1});
        })
    }),
    context('getData', () => {
        let user ={
            name: 'shoaib',
            city: 'khan',
            age: 23,
            address: {
                street: 'abc',
                phone: [4993493493,39049349099]
            }
        }
        it('keys', () => {
            user.should.to.have.keys('name','city','age', 'address')
        })
        it('property', () => {
            expect(user).to.have.property('name').with.length(6);
        }),
        it('keys', () => {
            expect(user).to.have.all.keys('name','city','age', 'address')
        }),
        it('nested property', () => {
            expect(user).to.have.nested.property('address.street');
        }),
        it('nested property', () => {
            expect(user).to.have.nested.include({'address.street': 'abc'});
        })

        it('should fetch user by id, ', () => {
            expect(getData(25)).to.be.an('object');
            expect(getData(25)).to.have.property('name', 'test');
            expect(getData(25)).to.have.property('id', '25');
        })

    })
})