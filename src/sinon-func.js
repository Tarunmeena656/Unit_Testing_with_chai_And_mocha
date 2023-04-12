class Myclass {
    constructor() {
        console.log('initiated')
    }

    add(a, b) {
        const result = a + b
        return result;
    }

    subtract(a,b) {
        return a-b;
    }

    sayHello(args) {
        console.log(args)
    }

    callanotherfunc(y, z) {
        this.sayHello('hello')
        const x = this.add(y, z)
        this.sayHello('hello')
        const x1 = this.add(y, z)
        return x;
    }

    callthecallback(callback) {
        callback();
    }

    greet(msg) {
        return `hello ${msg}`
    }

    greetmessage(grtmsg) {
        return this.greet(grtmsg)
    }

    mockFunc(args1, args2) {
        const result = this.subtract(args1,args2)
        return this.subtract(args1,args2)
    }
}



module.exports = Myclass;