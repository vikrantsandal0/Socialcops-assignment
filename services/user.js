
const async = require('async');
const jwt = require('jsonwebtoken');
const jsonPatch= require('json-patch');
var request= require('request');
const fs = require('fs');
var logging   = require('../logging.js');
var sharp= require('sharp');
var secret=require('../config.js');
const bcrypt=require('bcrypt');
const msg= require('../boom/boom.js').errorMessage.eng;
const suc=require('../boom/boom.js').MessageSuccess;



module.exports={

  check:async (email)=>
  {
     try{

      let result=await connection.query("select * from user where email = ?",[email])


    return result
     }
     catch(err){
      logging.logError(err);
     }
     
  },

  AddData:async (data)=>
  {
    var Reference = {
        module: 'Signup',
        api   : '/user/v1/addUser'
    };
          
         
    try{
      logging.log({EVENT:Reference, REQUEST_BODY:data});

       const salt =await  bcrypt.genSalt(5);
        const hash =  await bcrypt.hash(data.password, salt);
         const bigresult= await bcrypt.compare(data.password,hash);
          data.password=hash;
          
      data.contact= data.countryCode+data.contact;
      
      
    
   await  connection.query('INSERT INTO user(name,email,password,contact,createdAt) VALUES (?,?,?,?,CURRENT_TIMESTAMP)',[data.name,data.email,data.password,data.contact])
    
  

    let result= await connection.query("select * from user where email = ?",[data.email]);


   
    

return {'status':suc.Updated.status,message:suc.Cool.message,data:{'id':result[0].id,'email':result[0].email,'contact':result[0].contact}};    


    }
    catch(err){
      logging.logError(err);
      
  }
    },


 checkPhone:async(contact,code)=>
  {

    contact= code+contact
     try{


      let result=await connection.query("select * from user where contact = ?",[contact]);
      

    return result
     }
     catch(err){
      logging.logError(err);
     }
     
  },


   checkmail:async(mail)=>
  {
    try{
      let result=await connection.query("select * from user where email = ?",[mail]);
      return result;

     
    

  }
  catch(err){
    logging.logError(err);
  
  }
  },


   checkpass:async (body)=>
  {
    var Reference = {
        module: 'Login',
        api   : '/user/v1/login'
    };
    try{
       logging.log({EVENT:Reference,REQUEST_BODY:body});
       
      const result= await connection.query("select * from user where email = ?",[body.email]);
        const b= result[0].password;
        let a= await  bcrypt.compare(body.password, b);
         

   
   
    if(a==true){
     
var token= jwt.sign({id:result[0].id, username: result[0].name}, secret.key1, { algorithm: 'HS256'});

  

    return  {'Status':suc.Cool.status,'message':suc.Cool.message,data:{id:result[0].id,email:result[0].email,name:result[0].name},token:token};
  }

    return msg.WrongPassword;

    
    }
    
  catch(err){
    logging.logError(err);
  }
  },




  CheckToken:async(headers)=>{
    var Reference = {
        module: 'Token Check'
    };

try {
  logging.log({EVENT:Reference,REQUEST_HEADERS:headers.authorization});

     const token= headers.authorization;

  let result= await jwt.verify(token,secret.key1);
  
  return result;
  
} catch(e) {
  
return false;
}






},



ReturnPatch: async(payload)=>{
   var Reference = {
        module: 'Json-patch',
        api   : '/user/v1/jsonPatch'
    };
  try{
     logging.log({EVENT:Reference,REQUEST_BODY:payload});


    let result= await jsonPatch.apply(payload.patch1, payload.patch2);
     return  {'Status':suc.Cool.status,'message':suc.Cool.message,data:{result}};

}
catch(e){
  throw e;
     }

},



DownloadImage:async(payload)=>{
  var Reference = {
        module: 'thumbnail generation',
        api   : '/user/v1/thumbnail'
    };
   


 try{
  logging.log({EVENT:Reference,REQUEST_BODY:payload});


    const filename= 'resized.jpeg';
    const filename2='original.jpeg';
  

       const download=(uri, filename)=>{
    request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
   
     request(uri).pipe(fs.createWriteStream(filename2));

     const pipeline = sharp().resize(50,50)
   
     request(uri).pipe(pipeline).pipe(fs.createWriteStream(filename));
   
          
 });


  };
  await download(payload.url,filename);

  return filename;
 
}

 catch(e){
    return e;
       }


},


}




