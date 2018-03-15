const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2', endpoint: new AWS.Endpoint('http://localhost:8000') });

const env = process.env.NODE_ENV || 'local';

const userTableStructure = {
    TableName: 'user',
    KeySchema: [
        { AttributeName: "id", KeyType: "HASH" },
        { AttributeName: "name", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "N" },
        { AttributeName: "name", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

const dynamodb = new AWS.DynamoDB();
dynamodb.createTable(userTableStructure, (err, data) => {
    if (err) {
        console.log("Error", err);
    } else {
        console.log(`Success! Table created: ${data.TableDescription.TableName}`);
    }
});