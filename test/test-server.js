const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../lib/server');
const should = chai.should();
const app = server.app;

chai.use(chaiHttp);

describe('Survey api', function() {
    it('should get 200 on root', function(done) {
        chai.request(app)
            .get('/')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                done();
            });
    });
});
