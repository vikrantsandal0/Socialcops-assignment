let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);


  /*
  * Test the /POST route of login
  */
  describe('/json patch', () => {
      it('it should apply a patch on a given json document', (done) => {
        let patch = {
           
  "patch1": {
  "baz": "qux",
  "foo": "bar"
},
  "patch2": [
  { "op": "replace", "path": "/baz", "value": "boo" }
]
}
        
        chai.request('http://localhost:9000')
            .post('/user/v1/JsonPatch')
            .set('authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInVzZXJuYW1lIjoic3ViaCIsImlhdCI6MTUyNDQ5OTAyM30.atPx2QJAKZMn8210aKRupzyamkGtoK4P34IDo-6VPLQ')
            .send(patch)
            .end((err, res) => {
               
                res.should.have.status(200);
                res.body.should.be.a('object');
              done();
            });
      });

  });


/*
  * Test the /POST route of thumbnail
  */

  describe('/thumbnail', () => {
      it('it should take in an image url, download the image,crop it', (done) => {
        
        
        chai.request('http://localhost:9000')
            .post('/user/v1/thumbnail')
            .set('authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInVzZXJuYW1lIjoic3ViaCIsImlhdCI6MTUyNDQ5OTAyM30.atPx2QJAKZMn8210aKRupzyamkGtoK4P34IDo-6VPLQ')
            .type('form')
            .send({
              'url':'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&h=350'
            })
            .end((err, res) => {
              console.log(res);
                  
                res.should.have.status(200);
                 res.body.should.be.a('object');
                
              done();
            });
      });

  });



   