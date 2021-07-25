let processingController = require('../controllers/processing');

function getRouter(router) {
    router.post('/result',processingController.getCovidResult);
    return router;
}
module.exports = getRouter;