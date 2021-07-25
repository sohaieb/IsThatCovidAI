let express = require('express');
let router = express.Router();
let processingRouter = require('./processing');

router = processingRouter(router);

module.exports = router;

