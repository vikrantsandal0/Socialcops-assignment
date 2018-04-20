
var contro= require('../controllers');

 
    
var Joi= require('joi');
var request= require('request');
var path= require('path');


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
      path:'/user/v1/JsonPatch',

config: {


        description: 'takes two json object',
        notes: 'patches to a json object',
        tags: ['api','user'], // ADD THIS TAG
        plugins: {
            'hapi-swagger': {
               // payloadType: 'form'
            }
        },


          validate: {
            payload:{
              patch1:Joi.any(),

           patch2:Joi.array().required().items(Joi.object().keys({
                        op: Joi.string().optional(),
                        path: Joi.string().optional(),
                        value:Joi.string().optional()
                        
                    }))
          

            },


             headers: Joi.object({
                'authorization': Joi.string().required()
            }).unknown()






              }

        }
,
       

      handler:async function (request,h) {
        

            
         try{

        return  await contro.user.ApplyPatch(request.payload,request.headers);
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

      method:'POST',
      path:'/user/v1/thumbnail',

config: {
          

        description: 'creates a thumbnail',
        notes: 'downloads an image ,creates a thumbnail',
        tags: ['api','user'],
         plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },

         // ADD THIS TAG
        
 
          validate: {
            payload:{
             
              url:Joi.string().required(),
          
              

            },
             headers: Joi.object({
                'authorization': Joi.string().required()
            }).unknown()



              },
        },


      handler: async function (req,h) {
        try{
           
      return await contro.user.thumbnail(req.payload,req.headers);
      }
       catch(err){
      throw  err;
         }


     } 



    }
    ]);


module.exports=routes;