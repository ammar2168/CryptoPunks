var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:8080")

function waitSeconds(iMilliSeconds) {
  var counter= 0
      , start = new Date().getTime()
      , end = 0;
  while (counter < iMilliSeconds) {
      end = new Date().getTime();
      counter = end - start;
  }
}

describe("Test case for testing the CryptoPunk APIs",function(){
    
        //test case 1
          it("Positive test case for punk-info API for index 1001",function(done){
            var test_output ={
              "punk_info": {
                  "gender": "Male",
                  "accessories": [
                      "Luxurious Beard",
                      "Peak Spike",
                      "Nerd Glasses"
                  ],
                  "punkIndex": "1001",            
              }
          }

        // calling punk info api
        server
        .get("/api/v1/punk/1001")
        .expect("Content-type",/json/)
        .expect(200) // This is the expected status code from the API
        .end(function(err,res){
          // HTTP status should be 200
          res.status.should.equal(200);                     
          var result = res.body['punk_info']

          // checking if all expected properties are there in the response
          result.hasOwnProperty('isForSale').should.equal(true);
          result.hasOwnProperty('forSalePrice').should.equal(true);
          result.hasOwnProperty('currentBid').should.equal(true);
          result.hasOwnProperty('owner').should.equal(true);

          // deleting the attributes whose value can change and can break the test
          delete  result['isForSale']
          delete  result['forSalePrice']
          delete  result['currentBid']
          delete  result['owner']
          
          var response_body = JSON.stringify(res.body)
          var test_result_body = JSON.stringify(test_output)

          // this will assert for never changing data of the punk
          response_body.should.equal(test_result_body)

          done();
        });
      });


      //test case 2
      it("Negative test case for punk-info API for invalid index less than 0",function(done){
        
        var test_output ={
          "error": "Invalid punk index: '-1', index must be a positive number in the range 0-9999"
      }
          // calling punk info api
          server
          .get("/api/v1/punk/-1")
          .expect("Content-type",/json/)
          .expect(400) // This is the expected status code from the API
          .end(function(err,res){
            // HTTP status should be 400
            res.status.should.equal(400);          
            var response_body = JSON.stringify(res.body)
            var test_result_body = JSON.stringify(test_output)
            response_body.should.equal(test_result_body)
            done();
          });
        });

        
        //test case 3
        it("Negative test case for punk-info API for invalid index of 10002",function(done){
        
          var test_output ={
            "error": "Invalid punk index: '10002', index must be a positive number in the range 0-9999"
        }
    
            // calling punk info api
            server
            .get("/api/v1/punk/10002")
            .expect("Content-type",/json/)
            .expect(400) // This is the expected status code from the API
            .end(function(err,res){
              // HTTP status should be 400
              res.status.should.equal(400);          
              var response_body = JSON.stringify(res.body)
              var test_result_body = JSON.stringify(test_output)
              response_body.should.equal(test_result_body)
              done();
            });
          });
        
        
             //test case 4
        it("Negative test case for punk-info API for invalid index of %^&*",function(done){
        
            var test_output ={
              "error": "Invalid punk index, index must be a positive number in the range 0-9999"
          }
      
              // calling punk info api
              server
              .get("/api/v1/punk/%^&*")
              .expect("Content-type",/json/)
              .expect(400) // This is the expected status code from the API
              .end(function(err,res){
                // HTTP status should be 400
                res.status.should.equal(400);          
                var response_body = JSON.stringify(res.body)
                var test_result_body = JSON.stringify(test_output)
                response_body.should.equal(test_result_body)
                done();
              });
            });


            //test case 5
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


             //test case 6
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
    