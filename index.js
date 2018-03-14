const AWS = require('aws-sdk');

//sambda-sayHello
exports.sayHello = (event, context, callback) => {
    const { name } = event;

    if (!name) {
        callback('No name received');
    }

    const awsConfig = {};
    const lambda = new AWS.Lambda(awsConfig);

    lambda.invoke({
        LogType: 'Tail',
        InvocationType: 'RequestResponse',
        FunctionName: 'sambda-handleHelloMessage',
        Payload: JSON.stringify(event)
    }, (error, data) => {
        if (error) {
            callback(error);
        } else {
            callback(null, data.Payload);
        }
    });
};

//sambda-handleHelloMessage
exports.handleHelloMessage = (event, context, callback) => {
    const { name } = event;
    callback(null, `Greetings ${name}!`);
};

//https://4gwfdggje3.execute-api.us-east-2.amazonaws.com/dev/