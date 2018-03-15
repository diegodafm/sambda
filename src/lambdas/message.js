import post from '../helpers/http';

exports.message = (event, context, callback) => {
    const { name } = event;
    callback(null, `Greetings ${name}!`);
};