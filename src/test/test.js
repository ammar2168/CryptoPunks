var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:8080");

describe("Test case for testing the CryptoPunk APIs",function(){

            //test case 1
            it("Positive test case for punk for sale API",function(done){
                            
                  // calling punk for sale api
                  server
                  .get("/api/v1/punks-for-sale/")
                  .expect("Content-type",/json/)
                  .expect(200) // This is the expected status code from the API
                  .end(function(err,res){
                    // HTTP status should be 200
                    res.status.should.equal(200);                              
                    res.body.hasOwnProperty('punks_for_sale').should.equal(true);                    
                    done();
                  });
                });


             //test case 2
             it("Negative test case for punk for sale API by providing wrong url",function(done){
                            
                // calling punk for sale api
                server
                .get("/api/v1/punks-for-sal/")
                .expect("Content-type",/json/)
                .expect(404) // This is the expected status code from the API
                .end(function(err,res){
                  // HTTP status should be 200
                  res.status.should.equal(404);                                                
                  done();
                });
              });
            
    });
    