
var contro= require('../controllers');


var Joi= require('joi');


const routes=([


    







  //in hapi information comes in payload   
     {

      method:'POST',
      path:'/driver/v1/addDriver',

config: {


        description: 'new driver signup',
        notes: 'post driver data to database',
        tags: ['api','driver'], // ADD THIS TAG
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },


          validate: {
            payload:{
              name:Joi.string().required(),
              email:Joi.string().email().required(),
              password:Joi.string().min(5).max(20).error(new Error('password not valid')).required(),
              countryCode:Joi.string().min(3).max(5).required(),
             contact:Joi.string().min(10).max(15).required(),
          

            }
              }

        }
,
       

      handler:async function (request,h) {
        

            
         try{

        return  await contro.driver.AddEntry(request.payload);
      }
      catch(err){
        throw err;
      }
      }

      
      },



       {

      method:'POST',
      path:'/driver/v1/verifyDriver',

config: {


        description: 'verify driver otp',
        notes: 'OTP is must',
        tags: ['api','driver'], // ADD THIS TAG
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },


          validate: {
            payload:{
            email: Joi.string().email().required(),
              otp: Joi.string().required(),

            }
              }

        }
,
       

      handler:async function (request,h) {
        

            
         try{
          console.log(request.payload);

        return  await contro.driver.Verify(request.payload);
      }
      catch(err){
        throw err;
      }
      }

      
      },

       {

      method:'POST',
      path:'/driver/v1/login',

config: {
          

        description: 'Login driver',
        notes: 'Logs the  existing driver in and generates the webtoken',
        tags: ['api','driver'],
         plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },

         // ADD THIS TAG
        
 
          validate: {
            payload:{
             
              email:Joi.string().email().required(),
              password:Joi.string().required()
              

            }
              },
        },


      handler: async function (request,h) {
        try{

       return  await contro.driver.Login(request.payload);
     }
     catch(err){
      throw  err;
     }
      }



      


     },




     {

      method:'POST',
      path:'/driver/v1/DriverGetAllBooking',

config: {
          

        description: 'driver gets all booking',
        notes: ' driver sees all bookings after logging in',
        tags: ['api','driver'],
         plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },

         // ADD THIS TAG
        
 
          validate: {
            payload:{
              limit:Joi.number().integer().required()


            },

          
             headers: Joi.object({
                'authorization': Joi.string().required(),
                
            }).unknown()

              },
        },


      handler: async function (request,h) {
        try{
         
       return  await contro.driver.GetallForDriver(request.payload,request.headers);
     }
     catch(err){
      throw  err;
     }
      }



      


     }



,











   /**   {
       method:'PUT',
       path:'/user/v1/updateUser',

       config: {

        description: 'Updates user data',
        notes: 'Change the user data after generating web token',
        tags: ['api','user'], // ADD THIS TAG
         plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },


          validate: {
            payload:{
              name:Joi.string().required(),
              email:Joi.string().email().required(),
             password:Joi.string().min(5).max(20).error(new Error('password not valid')).required(),
            

            },
              headers: Joi.object({
                'authorization': Joi.string().required()
            }).unknown()

              }
        },
       handler: async function (request,h) {
                    try{
          return await contro.user.update(request.payload,request.headers)
}
catch(err){
  throw err;
}
       }



      



      },

     {

      method:'DELETE',
      path:'/user/v1/DeleteUser',
      config:{
         description: 'Deleting user data',
        notes: 'Deletes user data using jsonwebtoken',
        tags: ['api','user'],
        validate:{
        headers: Joi.object({
                'authorization': Joi.string().required()
            }).unknown()

        }
        

         // ADD THIS TAG
      },

      handler:async function (request,h) {
        try{
       return await contro.user.remove(request.headers)
     }
     catch(err){
      throw  err;
     }
      }



      


     },



     {

      method:'POST',
      path:'/user/v1/login',

config: {
          

        description: 'Login user',
        notes: 'Logs the user in and generates the webtoken',
        tags: ['api','user'],
         plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },

         // ADD THIS TAG
        
 
          validate: {
            payload:{
             
              email:Joi.string().email().required(),
              password:Joi.string().required()
              

            }
              },
        },


      handler: async function (request,h) {
        try{

       return  await contro.user.Login(request.payload);
     }
     catch(err){
      throw  err;
     }
      }



      


     },
     {

      method:'GET',
      path:'/user/v1/GetAll',

      config:{
         description: 'Get all users',
        notes: 'Gets all information about all users using aggregate',
        tags: ['api','user'], // ADD THIS TAG
      },
         handler: async function (request,h) {
          try{
        return await contro.user.getAll();
      }
      catch(err){
        throw err;
      }
      }


     }
      


     





**/


    ]);


module.exports=routes;