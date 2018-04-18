
var contro= require('../controllers');


var Joi= require('joi');


const routes=([


    







  //in hapi information comes in payload   
     {

      method:'POST',
      path:'/user/v1/addUser',

config: {


        description: 'new user signup',
        notes: 'post user data to database',
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
              countryCode:Joi.string().min(3).max(5).required(),
             contact:Joi.string().min(10).max(15).required(),
          

            }
              }

        }
,
       

      handler:async function (request,h) {
        

            
         try{

        return  await contro.user.AddEntry(request.payload);
      }
      catch(err){
        throw err;
      }
      }

      
      },



       {

      method:'POST',
      path:'/user/v1/verifyUser',

config: {


        description: 'verify user otp',
        notes: 'OTP is must',
        tags: ['api','user'], // ADD THIS TAG
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

        return  await contro.user.Verify(request.payload);
      }
      catch(err){
        throw err;
      }
      }

      
      },

       {

      method:'POST',
      path:'/user/v1/login',

config: {
          

        description: 'Login user',
        notes: 'Logs the  existing user in and generates the webtoken',
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

      method:'PUT',
      path:'/user/v1/UpdateUser',

config: {


        description: 'Updating user',
        notes: 'puts user data to database',
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
              countryCode:Joi.string().min(3).max(5).required(),
             contact:Joi.string().min(10).max(15).required(),
          

            },
             headers: Joi.object({
                'authorization': Joi.string().required()
            }).unknown()

              }

        }
,
       

      handler:async function (request,h) {
        

            
         try{

        return  await contro.user.UpdateUser(request.payload,request.headers);
      }
      catch(err){
        throw err;
      }
      }

      
      },
















      {

      method:'POST',
      path:'/user/v1/UserBookingAddress',

config: {


        description: 'user add the booking address',
        notes: 'booking after token generation',
        tags: ['api','user'], // ADD THIS TAG
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },


          validate: {
            payload:{
              streetAddress:Joi.string().required(),
              city:Joi.string().required(),
              state:Joi.string().required(),
              pinCode:Joi.string().min(5).max(7).required(),
            
          

            },

             headers: Joi.object({
                'authorization': Joi.string().required()
            }).unknown()





              }

        }
,
       

      handler:async function (request,h) {
        

            
         try{

        return  await contro.user.AddBookingAddress(request.payload,request.headers);
      }
      catch(err){
        throw err;
      }
      }

      
      },
      {

      method:'POST',
      path:'/user/v1/CreateBooking',

config: {


        description: 'user creates a booking',
        notes: 'booking after token generation',
        tags: ['api','user'], // ADD THIS TAG
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },


          validate: {
            payload:{
            addressId:Joi.string().required()

            },
            
             headers: Joi.object({
                'authorization': Joi.string().required()
            }).unknown()





              }

        }
,
       

      handler:async function (request,h) {
        

            
         try{

        return  await contro.user.CreateBooking(request.payload,request.headers);
      }
      catch(err){
        throw err;
      }
      }

      
      },
        {

      method:'PUT',
      path:'/user/v1/CancelBooking',

config: {


        description: 'Cancel Booking',
        notes: 'Cancel booking using booking id and token',
        tags: ['api','user'], // ADD THIS TAG
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },


          validate: {
            payload:{
              booking_id:Joi.string().required()
              

            },
             headers: Joi.object({
                'authorization': Joi.string().required()
            }).unknown()

              }

        }
,
       

      handler:async function (request,h) {
        

            
         try{

        return  await contro.user.DeleteUserBooking(request.payload,request.headers);
      }
      catch(err){
        throw err;
      }
      }

      
      },



     {

      method:'GET',
      path:'/user/v1/GetBooking',

config: {


        description: 'get user own Booking details',
        notes: 'after logging in get your own booking details',
        tags: ['api','user'], // ADD THIS TAG
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },


          validate: {
            
             headers: Joi.object({
                'authorization': Joi.string().required()
            }).unknown()

              }

        }
,
       

      handler:async function (request,h) {
        

            
         try{

        return  await contro.user.GetOwnBooking(request.headers);
      }
      catch(err){
        throw err;
      }
      }

      
      },























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