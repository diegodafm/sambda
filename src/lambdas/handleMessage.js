exports.handleMessage = (event, context, callback) => {
    const { name } = event.body;
    callback(null, `Greetings ${name}!`);
};