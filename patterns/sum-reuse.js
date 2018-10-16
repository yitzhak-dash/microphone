const seneca = require('seneca')();

seneca.add({ role: 'math', cmd: 'sum' }, (msg, reply) => {
    reply(null, { answer: (msg.left + msg.right) });
});

seneca.add({ role: 'math', cmd: 'sum', integer: true }, (msg, reply) => {
    seneca.act({ role: 'math', cmd: 'sum', left: Math.floor(msg.left), right: Math.floor(msg.right) }, reply)
});

seneca.add({ role: 'math', cmd: 'product' }, (msg, reply) =>
    reply(null, { answer: (msg.left * msg.right) }));

seneca
    .act({ role: 'math', cmd: 'sum', left: 3.3, right: 10.9 }, console.log)
    .act({ role: 'math', cmd: 'sum', left: 3.3, right: 10.9, integer: true }, console.log)
    .act({ role: 'math', cmd: 'product', left: 3, right: 10 }, console.log);