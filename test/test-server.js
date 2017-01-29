const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../lib/server');
const should = chai.should();
const app = server.app;

chai.use(chaiHttp);

describe('Survey api', function() {

  // check for server starting
    it('should get 200 on user for post', function(done) {
        chai.request(app)
            .get('/')
            .end(function(err, res) {
                res.should.have.status(200);;
                done();
            });
    });
});
