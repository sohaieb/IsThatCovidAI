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
            /*{
            fever: false,
            cough: false,
            tiredness: true,
            aches_and_pains: false,
            sore_throat: false,
            diarrhoea: false,
            conjunctivitis: false,
            headache: true,
            loss_taste_smell: false,
            rash_skin_discolouration_fingers_toes: false,
            difficulty_breathing: false,
            chest_pain: false,
            loss_speech_movement: true,
        }*/
            const input = req.body;
            let output = net.run(input);
            const finalObject = {input, output: {covid: output >= 0.5}};
            MongoDBService
                .insertOneToDb(finalObject,(err)=> {
                console.log(err);
                MongoDBService.finish();
            }, () => {
                MongoDBService.finish();
            });
            res.json({result: output});
        });
    });
}

exports.getCovidResult = getCovidResult;