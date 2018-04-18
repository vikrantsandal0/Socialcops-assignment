
const async = require('async');
const jwt = require('jsonwebtoken');

var secret=require('../config.js');
const bcrypt=require('bcrypt');
const msg= require('../boom/boom.js').errorMessage.eng;
const suc=require('../boom/boom.js').MessageSuccess
var Ufunctions= require('../utils/universalFunctions.js');


module.exports={

  check:async (email)=>
  {

     
     try{

      let result=await connection.query("select * from driver where email = ?",[email])

    return result
     }
     catch(err){
      console.log(err);
     }
     
  },

  AddData:async (data)=>
  {
          
         
    try{

        var salt =await  bcrypt.genSalt(10);
         var hash =  await bcrypt.hash(data.password, salt);
          data.password=hash;
          
      
      data.contact= data.countryCode+data.contact;
      console.log(typeof(data.contact));
      console.log(data.contact);
     let  otp = await (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
   await Ufunctions.twilioWork(data.contact,otp);
   console.log("your otp"+ otp);


   await  connection.query('INSERT INTO driver(name,email,password,contact,createdAt,otp) VALUES (?,?,?,?,CURRENT_TIMESTAMP,?)',[data.name,data.email,data.password,data.contact,otp]);
    
   
    

     var result= await connection.query("select * from driver where email = ?",[data.email]);
     

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


      let result=await connection.query("select * from driver where contact = ?",[contact]);
      console.log(result);

    return result
     }
     catch(err){
      console.log(err);
     }
     
  },

  verifyOtp: async(payload)=>{

       try {
      console.log("verify otp mein aya");
   

        let result2=await connection.query("select * from driver where email = ?",[payload.email]);
        if(result2[0].status==1){
            return msg.AlreadyVerified;

        }


else{
   let result3=await connection.query("select * from driver where email = ?",[payload.email]);
   let otp=result3[0].otp;


   if(payload.otp==otp){

       await connection.query("UPDATE driver set status='1' WHERE email= ? ",[payload.email]);
       var result= await connection.query("select * from driver where email = ?",[payload.email]);
       return {'status':suc.Verified.status,message:suc.Verified.message,data:{'id':result[0].id,'email':result[0].email,'contact':result[0].contact,'VerifiedStatus':result[0].status}}; ;



}
        else{
        return msg.InvalidOtp;
       }
      



       }
       



    } 
    catch(e) {
      
      throw e;
    }



  },

   checkmail:async(mail)=>
  {
    try{
      let result=await connection.query("select * from driver where email = ?",[mail]);
      return result;

     
    

  }
  catch(err){
    console.log(err);
  }
  },


   checkpass:async (body)=>
  {
try{
       
       var result= await connection.query("select * from driver where email = ?",[body.email]);
         var b= result[0].password;
         var c= result[0].status;
         console.log("yeh hai status  c wala");
         console.log(c);
         console.log(typeof(c));

   let a=await  bcrypt.compare(body.password, b);
   console.log("compare ka result");
   console.log(a);


   if(c!=1){
    return msg.NotVerified;



   }
   else{
    if(a==true){
      console.log(result);

var token= jwt.sign({id:result[0].id, username: result[0].name}, secret.key2, { algorithm: 'HS256'});

  

    return  {'Status':suc.Cool.status,'message':suc.Cool.message,data:{id:result[0].id,email:result[0].email,name:result[0].name},token:token};
  }

return msg.WrongPassword;


   }

    

    

    }
  catch(err){
    console.log(err);
  }
  },



  CheckToken:async(headers)=>{

try {
      var token= headers.authorization;

  let result= await jwt.verify(token,secret.key2);
  return result;
  
} catch(e) {
  
return false;
}






},

GetAllBookingsForDriver:async(headers,payload)=>{

try {
 // var li= headers.limit;
  //console.log("yhan tk gya");
   var token= headers.authorization;

  let decoded= await jwt.verify(token,secret.key2);
  var newId= decoded.id;
  console.log(newId);


  
  let num= payload.limit;
  
var result=await connection.query("SELECT booking.id AS booking_id,booking.status AS booking_status,user.name, user.email, user.contact,address.street_address,address.city,address.state,address.pincode FROM (user INNER JOIN address ON user.id= address.user_id)INNER JOIN booking ON address.id=booking.address_id WHERE booking.driver_id=? ORDER BY booking.createdAt DESC LIMIT ? ",[newId,num]);
if(result.length<1){
  return {'Status':suc.Cool.status,'message':suc.NoAssigned.message,data:{}};

}
else{
  return {'Status':suc.Cool.status,'message':suc.Cool.message,data:{'bookings':result}};

}


  
} catch(e) {
  
  console.log(e);
}



},








}

 /** getAllUsers: async()=>
  {
      const cred=db.collection('credentials');
      const jobs= db.collection('jobs');
   
     // let result=await cred.find({}).toArray();
      let result2= await jobs.find({}).toArray();
      console.log(result2);
     try{
   let result=await db.collection('credentials').aggregate([
   {
  
  $lookup: {
    from: "jobs",
    localField: '_id',
    foreignField: 'user_Id',
    as: "jobsInfo"
  }
}


])


      return result.toArray();
}
catch(err){
  console.log(err);
}      
  },

  updateUser:async(payload,headers)=>{

            var token= headers.authorization;

             

    const cred=db.collection('credentials');

    try{
      var decoded= await jwt.verify(token, secret);
            var newId=decoded.id;
          var newID=ObjectId(newId);



            var salt =await  bcrypt.genSalt(10);
var hash =await  bcrypt.hash(payload.password, salt);
payload.password=hash;



          
    let result= await cred.updateOne({'_id':newID},{$set :{name:payload.name,password:payload.password,modifiedAt:new Date()}});
    let NewResult= await cred.findOne({'_id':newID});

    return {'status':suc.Updated.status,message:suc.Cool.message,data:{'name':NewResult.name,'email':NewResult.email}};
  }

    catch(err){
      console.log(err);
    }

  },





  deleteUser:async(headers)=>{
    var token= headers.authorization;

    const cred=db.collection('credentials');
    try{

       var decoded= await jwt.verify(token, secret);
            var newId=decoded.id;
          var newID=ObjectId(newId);


    let result= await cred.remove({'_id':newID});
   
    return result;

  }
    catch(err){
      console.log(err);
    }
  },
  
  
    checkmail:async (mail)=>
  {
    try{

     const cred=db.collection('credentials');
     let mai=await cred.findOne( { 'email':mail} )

    return mai
  }
  catch(err){
    console.log(err);
  }
  },

   checkpass:async (body)=>
  {
    try{
    const cred=db.collection('credentials');
     let b=await cred.findOne( { 'email':body.email});

   let a=await  bcrypt.compare(body.password, b.password);

    

    if(!a)return msg.invalidCredentials;

    const user= await cred.findOne({'email':body.email});
    console.log(user);

var token= jwt.sign({ id: user._id, username: user.name}, secret, { algorithm: 'HS256'});

  

    return  {'Status':suc.Cool.status,'message':suc.Cool.message,data:{id:user._id,email:user.email,name:user.name},token:token};
  }
  catch(err){
    console.log(err);
  }
  },

   CheckId:async (headers)=>
  {    
    var token= headers.authorization;
        
     const cred=db.collection('credentials');
     try{

         var decoded= await jwt.verify(token, secret);
         
          var newId=decoded.id;
          var newID=ObjectId(newId);

      let result=await cred.findOne({ '_id':newID} );
      console.log(result);

    return result
     }
     catch(err){
      console.log(err);
     }
     
  },


 GetOnlyOne: async(headers)=>
  {
      const cred=db.collection('credentials');
      const jobs= db.collection('jobs');
      var token= headers.authorization;
   
     // let result=await cred.find({}).toArray();
     
      
     
     try{

        var decoded= await jwt.verify(token, secret);
         
          var newId=decoded.id;
          var newID=ObjectId(newId);




   let result=await db.collection('credentials').aggregate([

{
$match:{_id:newID}
},

   {

  
  $lookup: {
    from: "jobs",
    localField: '_id',
    foreignField: 'user_Id',
    as: "jobsInfo"
  }
}])


      return result.toArray();
}
catch(err){
  console.log(err);
}      
  },


CheckToken:async(headers)=>{


try {
      var token= headers.authorization;

  let result= await jwt.verify(token,secret);
  return result;
  
} catch(e) {
  
return false;
}






}



**/


