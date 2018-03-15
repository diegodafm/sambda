import AWS from 'aws-sdk';
import env from '../helpers/env';
import _ from 'lodash';
import dynamodb from 'serverless-dynamodb-client';

let db;
if (env.isOffline) {
    db = dynamodb.doc;
} else {
    AWS.config.update(env.awsConfig);
    db = new AWS.DynamoDB.DocumentClient();
}

const DYNAMO_BATCH_GET_ITEM_LIMIT = 100; // BatchGet can retrieve at most 100 items at a time (https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_BatchGetItem.html)

class DataStore {
    constructor(tableName, expire = 0) {
        this.tableName = DataStore.getTableName(tableName);
        this.expire = expire; // expire in seconds
        if (new.target === DataStore) {
            throw new TypeError('Cannot construct DataStore instances directly');
        }
    }

    static getTableName(tableName) {
        return `${tableName}`.toLowerCase();
    }

    setTableName(tableName) {
        this.tableName = DataStore.getTableName(tableName);
    }

    /* eslint-disable */
    async get(id) {
    }

    async save(obj) {
    }

    async del(id) {
    }
    /* eslint-enable */
}

class DynamoDataStore extends DataStore {
    async get(id, keyName = 'id') {
        const doc = await db.get({
            TableName: this.tableName,
            Key: {
                [`${keyName}`]: id
            },
        }).promise();

        if (doc && doc.Item) {
            return doc.Item;
        }
        return null;
    }


    async batchGet(keys) {
        const chunks = _.chunk(keys, DYNAMO_BATCH_GET_ITEM_LIMIT);

        const allChunksPromises = chunks.map((chunk)=> {
            return db.batchGet({
                RequestItems: {
                    [`${this.tableName}`]: {
                        Keys: chunk
                    }
                }
            }).promise();
        });

        const allChunksResults = await Promise.all(allChunksPromises);
        const allResponseItems = allChunksResults.map(result=>result.Responses[`${this.tableName}`]);
        return _.flatten(allResponseItems);
    }

    async getAll() {
        return db.scan({
            TableName: this.tableName
        }).promise();
    }

    async query(params) {
        params.TableName = this.tableName;
        return db.query(params).promise();
    }

    async save(data) {
        if (this.expire && this.expire > 0) {
            data.expire = Math.floor(Date.now() / 1000) + this.expire;
        }
        try {
            await db.put({
                TableName: this.tableName,
                Item: JSON.parse(JSON.stringify(data)),
            }).promise();
            return data;
        } catch (err) {
            console.log('Failed to save object', {
                obj: JSON.stringify(data),
                table: this.tableName,
            }, err);
        }

    }

    async delete(params) {
        await db.delete({
            TableName: this.tableName,
            Key: params
        }).promise();
    }

    dynamodbClient() {
        return db;
    }
}

export default DynamoDataStore;
