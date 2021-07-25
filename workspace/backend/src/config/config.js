/**
 * Global app configuration
 *
 * @type {{port: number}}
 */
module.exports = {
    port: 3000,
    mongoDbUrl: 'mongodb://localhost:27017',
    dbName: 'IsThatCovidAI',

    /**
     * you have to use real dataset file and and convert it
     * with the same format as the fake_dataset.json file
     */
    CasesFile: '_artifacts/fake_dataset.json'
};