const MongoClient = require('mongodb').MongoClient;
var schema= require('./models');


  


   async  function connect(){


            try {
                
                  MongoClient.connect("mongodb://localhost:27017",function(err,client){


                  

                    

                     global.dba=client.db('connecto');
                     console.log(" mongo database chal pda");
                       schema.user.bookingSchema();
                       
                       console.log("hogya paar");

                  });

               
              

                
            } catch (err) {

                return err

            }

    }

connect();