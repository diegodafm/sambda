import AWS from 'aws-sdk';
import env from '../helpers/env';
import post from '../helpers/http';

exports.sayHello = (event, context, callback) => {
    const { name } = event;
    
    if (!name) {
        callback('No name received');
    }

    if (env.isOffline) {
        post('message', { name }, (result)=> {
            callback(null, result);
        });
    } else {
        const awsConfig = {};
        const lambda = new AWS.Lambda(awsConfig);
        lambda.invoke({
            LogType: 'Tail',
            InvocationType: 'RequestResponse',
            FunctionName: 'message',
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