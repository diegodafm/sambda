const DynamoDataStore = require('../db/DynamoDataStore');
const USER_TABLE_NAME = 'user';

exports.handleMessage = (event, context, callback) => {
    const { name } = event;
    let greetingMessage = 'Greetings';
    
    const db = new DynamoDataStore(USER_TABLE_NAME);
    console.log('1');
    db.save({name}).then(result=>{
        console.log(result);
    }).catch(error =>{
        console.log(error);
    })
    console.log('2');
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