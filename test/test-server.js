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
                res.should.have.status(200);
                done();
            });
    });

    // check post route for new user
    // it('should add a user on POST', function(done) {
    //   const newUser = {
    //      'name': 'Abraham Lincoln',
    //      'email': 'AL123@gmail.com',
    //      'password': 'honestabe'
    //   }
    //     chai.request(app)
    //       .post('/user')
    //       .send(newUser)
    //       .end(function(err, res) {
    //           if(err){
    //                 should.equal(err, null);
    //                 console.log("error");
    //                 done(err);
    //             }
    //             else {
    //                 res.should.have.status(200);
    //                 res.should.be.json;
    //                 res.body.should.be.a('object');
    //                 res.body.should.include.keys('name', 'email', 'password');
    //                 res.body.title.should.equal(newUser.name);
    //                 res.body.content.should.equal(newUser.email);
    //                 res.body.author.should.equal(newUser.password);
    //                 done();
    //             }
    //       });
    //   });
    //
    //   // check post route for login
    //     it('should confirm login', function(done) {
    //         const userAuth = {
    //            'email': 'AL123@gmail.com',
    //            'password': 'honestabe'
    //         }
    //         chai.request(app)
    //             .post('/authenticate')
    //             .send(userAuth)
    //             .end(function(err, res) {
    //                 if(err){
    //                     should.equal(err, null);
    //                     console.log("error");
    //                     done(err);
    //                 }
    //                 else {
    //                     res.should.have.status(200);
    //                     res.should.be.json;
    //                     res.body.should.be.a('object');
    //                     res.body.should.include.keys('email', 'password');
    //                     res.body.title.should.equal(userAuth.name);
    //                     res.body.content.should.equal(userAuth.email);
    //                     done();
    //                 }
    //             });
    //     });
    //
    //     // check for surveys in the DB
    //       it('should get 200 for surveys', function(done) {
    //           chai.request(app)
    //               .get('/survey')
    //               .end(function(err, res) {
    //                   if(err){
    //                       should.equal(err, null);
    //                       console.log("error");
    //                       done(err);
    //                   }
    //                   else {
    //                       res.should.have.status(200);
    //                       res.should.be.json;
    //                       res.body.should.be.a('object');
    //                       done();
    //                   }
    //               });
    //       });
    //
    //       // check for surveys in the DB
    //         it('should get 200 on a survey', function(done) {
    //             chai.request(app)
    //                 .get('/survey/:id')
    //                 .end(function(err, res) {
    //                     if(err){
    //                         should.equal(err, null);
    //                         console.log("error");
    //                         done(err);
    //                     }
    //                     else {
    //                         res.should.have.status(200);
    //                         res.should.be.json;
    //                         res.body.should.be.a('object');
    //                         done();
    //                     }
    //                 });
    //         });

});
