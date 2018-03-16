import AWS from 'aws-sdk';
import env from '../helpers/env';
import post from '../helpers/http';

exports.sayHello = async (event, context, callback) => {
    const { name, id } = event;
    
    if (env.isOffline) {
        post('message', { name, id }, (result)=> {
            callback(null, result);
        });
    } else {
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