module.exports = {
  port  : process.env.PORT || 3000,
  morgan: process.env.MORGAN || 'dev',
  mongo : process.env.MONGO || 'mongodb://localhost:27017/testVoteApp'
};
