import DynamoDataStore from '../db/DynamoDataStore';
import uuid from 'uuid/v1';

const USER_TABLE_NAME = 'users';

exports.message = (event, context, callback) => {
    const { name, id } = event;
    let greetingMessage = 'Greetings';

    const db = new DynamoDataStore(USER_TABLE_NAME);

    // console.log('1');
    // const id = uuid();
    // db.save({id, name}).then(result=>{
    //     console.log(result);
    // }).catch(error =>{
    //     console.log(error);
    // })
    // console.log('2');

    // if(!user){
    //     console.log('3');
    //     greetingMessage = 'Welcome';
    //     db.save({name}).then(result=>{
    //         console.log(result);
    //     }).catch(error =>{
    //         console.log(error);
    //     });
    // }

    callback(null, `${greetingMessage} ${name}!`);
};