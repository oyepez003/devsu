process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('App', () => {
 /*
  * Test the /GET route
  */
  describe('/GET hello/Eliezer', () => {
      it('it should GET the hello world message', (done) => {
        chai.request(server)
            .get('/hello/eliezer')
            .end((err, res) => {
                res.should.have.status(200);
		res.body.should.be.an.instanceOf(Object).and.have.property('message');
	        res.body.message.should.be.a('string');
                res.body.message.should.match(/Hello eliezer from */);
              done();
            });
      });
  });

});
