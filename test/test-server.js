const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../lib/server');
const should = chai.should();
const app = server.app;

chai.use(chaiHttp);

describe('Survey api', function() {

  // check for server starting
    it('should get 200 on root', function(done) {
        chai.request(app)
            .get('/')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                done();
            });
    });

    // check for post route
    it('should add a user on POST', function() {
      const newUser = {
         'name': 'Abraham Lincoln',
         'email': 'AL123@gmail.com',
         'password': 'honestabe'
      }
        chai.request(app)
          .post('/user')
          .send(newUser)
          .end(function(err, res) {
             should.equal(err, null);
             res.should.have.status(200);
             res.should.be.json;
             res.body.should.be.a('object');
             res.body.should.have.property('name');
             res.body.should.have.property('email');
             res.body.should.have.property('password');
             res.body.name.should.be.a('string');
             res.body.email.should.be.a('string');
             res.body.password.should.be.a('string');
             res.body.name.should.equal('Abraham Lincoln');
             res.body.email.should.equal('AL123@gmail.com');
             res.body.password.should.equal('honestabe');
            done();
          });
      });

});
