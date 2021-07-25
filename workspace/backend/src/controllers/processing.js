let MongoDBService = require('../services/MongoDbService');
let brainJS = require('brain.js');
const net = new brainJS.NeuralNetwork();

/**
 * Get Covid casse result
 *
 * @param req
 * @param res
 * @param next
 */
function getCovidResult(req,res,next) {
    MongoDBService.prepare((client) => {
        MongoDBService.getResultRecords((result) => {
                net.train(result);
            const input = req.body;
            for(let prop in input) {
                input[prop] = (input[prop] === 'yes');
            }
            let output = net.run(input);
            const finalObject = {input, output: {covid: output.covid >= 0.5}};
            MongoDBService
                .insertOneToDb(finalObject,(err)=> {
                    console.log(err);
                MongoDBService.finish();
            }, () => {
                    res.json({result: finalObject.output});
                MongoDBService.finish();
            });
        });
    });
}

exports.getCovidResult = getCovidResult;