const AWS = require('aws-sdk');
const {isOffline, awsConfig} = require('../helpers/env');
const {post} = require('../helpers/http');


exports.sayHello = (event, context, callback) => {
    const { name } = event;
    if (!name) {
        callback('No name received');
    }

    if (isOffline) {
        post('handleMessage', { name }, (result)=> {
            callback(null, result);
        });
    } else {
        const lambda = new AWS.Lambda(awsConfig);
        lambda.invoke({
            LogType: 'Tail',
            InvocationType: 'RequestResponse',
            FunctionName: 'handleMessage',
            Payload: JSON.stringify(event)
        }, (error, data) => {
            if (error) {
                callback(error);
            } else {
                callback(null, data.Payload);
            }
        });
    }
};