import DynamoDataStore from '../db/DynamoDataStore';
import uuid from 'uuid/v1';

const USER_TABLE_NAME = 'users';

exports.message = async (event, context, callback) => {
    const { name, id:userID } = event;
    const db = new DynamoDataStore(USER_TABLE_NAME);
    let user;
    let greetingMessage = 'Greetings';
    
    if(!userID) {
        const id = uuid();
        user = await db.save({id, name});
        greetingMessage = 'Welcome user';
    } else {
        user = await db.get(userID, 'id');
        greetingMessage = 'Greetings user';
    }

    callback(null, `${greetingMessage} ${user.name}, User id: ${user.id}!`);
};