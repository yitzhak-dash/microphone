var seneca = require('seneca')();

seneca
    .add({ role: 'math', cmd: 'sum' }, (msg, reply) => reply(null, { answer: (msg.left + msg.right) }))
    .add({ role: 'math', cmd: 'sum' }, function (msg, respond) {
        if (!Number.isFinite(msg.left) ||
            !Number.isFinite(msg.right)) {
            return respond(new Error("Expected left and right to be numbers."))
        }
        // call previous action function for role:math,cmd:sum
        this.prior({
            role: 'math',
            cmd: 'sum',
            left: msg.left,
            right: msg.right,

        }, function (err, result) {
            if (err) return respond(err);

            result.info = msg.left + '+' + msg.right;
            respond(null, result)
        })
    });

seneca.act('role:math,cmd:sum,left:-1.5,right:2.5',
    console.log // prints { answer: 4, info: '1.5+2.5' }
);
