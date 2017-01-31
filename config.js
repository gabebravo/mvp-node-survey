// module.exports = {
//   port  : process.env.PORT || 8080;
//   morgan: process.env.MORGAN || 'dev',
//   mongo : process.env.DATABASE_URL ||
//                          global.DATABASE_URL ||
//                          (process.env.NODE_ENV === 'production' ?
//                               'mongodb://surveyAdmin:bravo1@ds137729.mlab.com:37729/survey_db' :
//                               'mongodb://localhost/survey_db')
// };

exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://surveyAdmin:bravo1@ds137729.mlab.com:37729/survey_db' :
                            'mongodb://localhost/survey_db');
exports.PORT = process.env.PORT || 8080;
