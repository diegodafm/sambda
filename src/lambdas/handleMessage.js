exports.handleMessage = (event, context, callback) => {
    const { name } = event;
    callback(null, `Greetings ${name}!`);
};