const MongoClient = require('mongodb').MongoClient;
const {dbName, mongoDbUrl, CasesFile} = require('../config/config');
const fs = require('fs');

let singleton;

class MongoDbService {
    #client;
    #db;

    constructor() {
        this.#client = new MongoClient(mongoDbUrl);
    }

    static getInstance() {
        if (!singleton) {
            singleton = new MongoDbService();
        }
        return singleton;
    }

    /**
     * Prepare client and db to connected DB
     *
     * @param operation this should ended the client param with client.close()
     */
    prepare(operation) {
        this.#client.connect((err) => {
            this.#db = this.#client.db(dbName);
            if (err) {
                console.log(err);
                this.#client.close();
                return;
            }
            operation(this.#client);
        });

    }

    /**
     * Insert records to DB
     *
     * @param {Array} records
     * @param error
     * @param success
     * @param collection
     */
    insertToDb(records, error, success, collection = 'cases') {
        const coll = this.#db.collection(collection);
        // Insert some documents
        coll.insertMany(records, function (err, result) {
            if (err) {
                error(err);
                return;
            }
            success(result);
        });
    }

    /**
     * Insert records to DB
     *
     * @param record
     * @param error
     * @param success
     * @param collection
     */
    insertOneToDb(record, error, success, collection = 'cases') {
        const coll = this.#db.collection(collection);
        // Insert some documents
        coll.insertOne(record, function (err, result) {
            if (err) {
                error(err);
                return;
            }
            success(result);
        });
    }

    /**
     * Check if collection is empty then insert from file and get recordsresult
     *
     * @param processBrainJS
     * @param collection
     */
    getResultRecords(processBrainJS, collection = 'cases') {
        const coll = this.#db.collection(collection);
        coll
            .countDocuments({})
            .then(size => {
                this.fillAndGetRecordsDataBaseIfEmpty(size, coll, processBrainJS);
            });
    }

    /**
     * Fill database if its empty
     *
     * @param size
     * @param coll
     * @param processBrainJS
     */
    fillAndGetRecordsDataBaseIfEmpty(size, coll, processBrainJS) {
        if (!size) {
            this.insertFromJsonFile((result) => {
                coll.find({})
                    .toArray((err, result) => {
                        if (err) throw err;
                        processBrainJS(result);
                    });
            });
            return;
        }
        coll.find({})
            .toArray((err, result) => {
                if (err) throw err;
                processBrainJS(result);
            });
    }

    /**
     * Insert records from JSON file
     *
     * @param recordFinished
     */
    insertFromJsonFile(recordFinished) {
        fs.readFile(`src/${CasesFile}`, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            let records = JSON.parse(data.toString('utf-8'));
            records = records.map(objt => {
                let tempObjt = {...objt};
                let obj = {input: null, output: null};
                obj.output = {covid: tempObjt.covid_result};
                delete tempObjt.covid_result;
                obj.input = {...tempObjt};
                return obj;
            });
            this.insertToDb(records, (error) => {
                recordFinished(error);
            }, (result) => {
                recordFinished(result);
            });
        });
    }

    /**
     * Finish transactions
     */
    finish(){
        this.#client.close();
    }
}

module.exports = MongoDbService.getInstance();