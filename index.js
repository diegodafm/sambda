const {sayHello} = require('./src/lambdas/sayHello');
const {handleMessage} = require('./src/lambdas/handleMessage');

exports.sayHello = sayHello;
exports.handleMessage = handleMessage;