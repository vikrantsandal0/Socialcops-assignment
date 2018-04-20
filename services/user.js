
const async = require('async');
const jwt = require('jsonwebtoken');
const jsonPatch= require('json-patch');
var request= require('request');
 var fs = require('fs');


var secret=require('../config.js');
const bcrypt=require('bcrypt');
const msg= require('../boom/boom.js').errorMessage.eng;
const suc=require('../boom/boom.js').MessageSuccess
var Ufunctions= require('../utils/universalFunctions.js');



module.exports={

  check:async (email)=>
  {

     
     try{

      let result=await connection.query("select * from user where email = ?",[email])

    return result
     }
     catch(err){
      console.log(err);
     }
     
  },

  AddData:async (data)=>
  {
          
         
    try{

        var salt =await  bcrypt.genSalt(5);
         var hash =  await bcrypt.hash(data.password, salt);
         const bigresult= await bcrypt.compare(data.password,hash);
         console.log(hash);
         console.log("****************heres the answer***********", bigresult);
      
          data.password=hash;
          
      data.contact= data.countryCode+data.contact;
      
      
    console.log("****************heres the same answer***********", bigresult);
   await  connection.query('INSERT INTO user(name,email,password,contact,createdAt) VALUES (?,?,?,?,CURRENT_TIMESTAMP)',[data.name,data.email,data.password,data.contact])
    
  

    let result= await connection.query("select * from user where email = ?",[data.email]);


   
    

return {'status':suc.Updated.status,message:suc.Cool.message,data:{'id':result[0].id,'email':result[0].email,'contact':result[0].contact}};    


    }
    catch(err){
      console.log(err);
      
  }
    },


 checkPhone:async(contact,code)=>
  {

    contact= code+contact
     try{


      let result=await connection.query("select * from user where contact = ?",[contact]);
      console.log(result);

    return result
     }
     catch(err){
      console.log(err);
     }
     
  },


   checkmail:async(mail)=>
  {
    try{
      let result=await connection.query("select * from user where email = ?",[mail]);
      return result;

     
    

  }
  catch(err){
    console.log(err);
  }
  },


   checkpass:async (body)=>
  {
    try{
       
       var result= await connection.query("select * from user where email = ?",[body.email]);
         var b= result[0].password;

         console.log("password in database", b);
         console.log(body.password);
         

         let a= await  bcrypt.compare(body.password, b);
         console.log("bcrypt compare result");
          console.log(a);


   
   
    if(a==true){
      console.log(result);

var token= jwt.sign({id:result[0].id, username: result[0].name}, secret.key1, { algorithm: 'HS256'});

  

    return  {'Status':suc.Cool.status,'message':suc.Cool.message,data:{id:result[0].id,email:result[0].email,name:result[0].name},token:token};
  }

    return msg.WrongPassword;

    
    }
    
  catch(err){
    console.log(err);
  }
  },




  CheckToken:async(headers)=>{

try {
      var token= headers.authorization;

  let result= await jwt.verify(token,secret.key1);
  return result;
  
} catch(e) {
  
return false;
}






},



ReturnPatch: async(payload)=>{
  try{

    let result= await jsonPatch.apply(payload.patch1, payload.patch2);
     return result;

}
catch(e){
  throw e;
     }

},



DownloadImage:async(payload)=>{


 try{
     var filename= 'image.jpeg';
    var download = function(uri, filename){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename));
  });
};

  download(payload.url, filename);




 }
 catch(e){
    throw e;


 }


}





}




