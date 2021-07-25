/**
 * Global app imports
 *
 * @type {e | (() => Express)}
 */
let express = require('express');
let bodyParser = require('body-parser');
let {port} = require('./config/config');
let router = require('./routes/index');
let app = express();
let cors = require('cors');

app.use(cors());

module.exports = {
    express,
    bodyParser,
    port,
    app,
    router
}