module.exports = {
  port  : process.env.PORT || 3000,
  morgan: process.env.MORGAN || 'dev',
  mongo : process.env.MONGO || 'https://morning-inlet-39864.herokuapp.com/'
};
