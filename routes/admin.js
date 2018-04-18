
var contro= require('../controllers');


var Joi= require('joi');


const routes=([


    







  //in hapi information comes in payload   
     
       

       {

      method:'POST',
      path:'/admin/v1/login',

config: {
          

        description: 'Login admin',
        notes: 'Logs the  super admin  in and generates the webtoken',
        tags: ['api','admin'],
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

       return  await contro.admin.Login(request.payload);
     }
     catch(err){
      throw  err;
     }
      }



      


     },
     
     {

      method:'POST',
      path:'/admin/v1/GetAllBooking',

config: {
          

        description: 'admin gets all booking',
        notes: 'admin gets all bookings',
        tags: ['api','admin'],
         plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },

         // ADD THIS TAG
        
 
          validate: {
            payload:{
              limit:Joi.number().default(20)


            },

          
             headers: Joi.object({
                'authorization': Joi.string().required(),
                
            }).unknown()

              },
        },


      handler: async function (request,h) {
        try{
         
       return  await contro.admin.Getall(request.payload,request.headers);
     }
     catch(err){
      throw  err;
     }
      }



      


     }
     ,
     {

      method:'POST',
      path:'/admin/v1/AssignDriver',

config: {
          

        description: 'Assign  driver',
        notes: 'Assign driver to an existing booking',
        tags: ['api','admin'],
         plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },

         // ADD THIS TAG
        
 
          validate: {
            payload:{
             
              booking_id:Joi.string().required(),
              driver_id:Joi.string().required()
              

            },
             headers: Joi.object({
                'authorization': Joi.string().required()
            }).unknown()


              }
        },


      handler: async function (request,h) {
        try{

       return  await contro.admin.AssignDriver(request.payload,request.headers);
     }
     catch(err){
      throw  err;
     }
      }



      


     }
     ,
      {

      method:'GET',
      path:'/admin/v1/GetUser',

config: {
          

        description: 'Get particular user details',
        notes: 'using token and user id',
        tags: ['api','admin'],
         plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },

         // ADD THIS TAG
        
 
          validate: {
            query:{
             
             
              user_id:Joi.string().required()
              

            },
             headers: Joi.object({
                'authorization': Joi.string().required()
            }).unknown()


              }
        },


      handler: async function (request,h) {
        try{

       return  await contro.admin.GetOneUser(request.query,request.headers);
     }
     catch(err){
      throw  err;
     }
      }



      


     },

     {

      method:'GET',
      path:'/admin/v1/GetAllDriver',

config: {
          

        description: 'Get all driver details',
        notes: 'using token ',
        tags: ['api','admin'],
         plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },

         // ADD THIS TAG
        
 
          validate: {
           
             headers: Joi.object({
                'authorization': Joi.string().required()
            }).unknown()


              }
        },


      handler: async function (request,h) {
        try{

       return  await contro.admin.GetAllDrivers(request.headers);
     }
     catch(err){
      throw  err;
     }
      }



      


     },
     {

      method:'GET',
      path:'/admin/v1/GlobalSearch',

config: {
          

        description: 'makes a global search',
        notes: 'using token  and username',
        tags: ['api','admin'],
         plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },

         // ADD THIS TAG
        
 
          validate: {
            query:{
              username:Joi.string().required()

            },

           
             headers: Joi.object({
                'authorization': Joi.string().required()
            }).unknown()


              }
        },


      handler: async function (request,h) {
        try{

       return  await contro.admin.GlobalSearch(request.headers,request.query);
     }
     catch(err){
      throw  err;
     }
      }



      


     }
     
     
     
     
     
     



]);














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


    


module.exports=routes;