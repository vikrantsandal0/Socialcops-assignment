const Hapi = require('hapi');
//var  call= require('./call.js').letsConnect();
const Boom= require('boom');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const cors= require('cors');
const routes= require('./routes/index.js');




var db=require('./connect.js');





var server = Hapi.server({port:9000,routes:{cors:{additionalHeaders:["accept","authorization","content-type"]}}});

// Create the data store for the test API






async function hiii() {


    
 










  const swaggerOptions = {
        info: {
                title: 'Test API Documentation',
                version: '1.0.0',
            },
        };
    
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);



    try {
          
        await server.start();


    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }






    console.log('Server running at:', server.info.uri);


};



  hiii();


server.route(routes);













