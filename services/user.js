
const async = require('async');
const jwt = require('jsonwebtoken');
const database = require('../connect2.js');

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

        var salt =await  bcrypt.genSalt(10);
         var hash =  await bcrypt.hash(data.password, salt);
          data.password=hash;
          
      
      data.contact= data.countryCode+data.contact;
      console.log(typeof(data.contact));
      console.log(data.contact);
       let otp = await (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
   await Ufunctions.twilioWork(data.contact,otp);
   console.log("your otp"+ otp);

   await  connection.query('INSERT INTO user(name,email,password,contact,createdAt,otp) VALUES (?,?,?,?,CURRENT_TIMESTAMP,?)',[data.name,data.email,data.password,data.contact,otp])
    
  

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

  verifyOtp: async(payload)=>{

    try {
      console.log("verify otp mein aya");
      

        let result2=await connection.query("select * from user where email = ?",[payload.email]);
        if(result2[0].status==1){
            return msg.AlreadyVerified;

        }


else{
       let result3=await connection.query("select * from user where email = ?",[payload.email]);
       let otp= result3[0].otp;

 
   if(payload.otp==otp){

       await connection.query("UPDATE user set status='1' WHERE email= ? ",[payload.email]);
       var result= await connection.query("select * from user where email = ?",[payload.email]);
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

var token= jwt.sign({id:result[0].id, username: result[0].name}, secret.key1, { algorithm: 'HS256'});

  

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

  let result= await jwt.verify(token,secret.key1);
  return result;
  
} catch(e) {
  
return false;
}






},

AddAddress:async(data,headers)=>

  {

    var token= headers.authorization;
         
         try{
           
         
          var decoded= await jwt.verify(token, secret.key1);
          console.log(decoded);
          var newId=decoded.id;
          
          console.log(typeof(newId)+ newId);




         console.log("phuncha");
 
 var result =await  connection.query('INSERT INTO address(user_id,street_address,city,state,pincode,createdAt) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP)',[newId,data.streetAddress,data.city,data.state,data.pinCode])

      var result2= await connection.query("select * from address where id = ?",[result.insertId]);
   
       console.log(result.insertId);
    
       return{status:suc.Cool.status,message:suc.Cool.message,data:{id:result2[0].id,user_id:result2[0].user_id,address:result2[0].street_address,city:result2[0].city,state:result2[0].state}};
      
  }
  catch(err){
  console.log(err);
}

},

CheckExistingAdd: async(payload,headers)=>{


var token= headers.authorization;
try {
  
var decoded= await jwt.verify(token, secret.key1);
          console.log(decoded);
          var newId=decoded.id;
          var result=await connection.query("SELECT * FROM address WHERE id = ? AND user_id = ?",[payload.addressId,newId]);
          return result;

} catch(e) {
  
  throw  e;
}





},

Booking:async(payload,headers)=>{
  var token= headers.authorization;

 try {
  var decoded= await jwt.verify(token, secret.key1);
          console.log(decoded);
          var newId=decoded.id;

       var result=  await  connection.query('INSERT INTO booking(user_id,address_id,createdAt,status) VALUES (?,?,CURRENT_TIMESTAMP,"pending")',[newId,payload.addressId])

       var result2=await connection.query("select * from booking where id = ?",[result.insertId]);

        var mng={
          user_id:newId.toString(),
        booking_id:result2[0].id.toString(),
        status:result2[0].status,
        driver_id:"not assigned",

         createdAt:new Date().toString(),
         modifiedAt:new Date().toString(),
       }
      
       var cred=dba.collection('bookingHistory');

       let myData= await  cred.insertOne(mng);
        console.log("yhan tk aya kya?");
       console.log(myData.ops[0]);

       return {status:suc.Cool.status,message:suc.Created.message,data:{id:result2[0].id,user_id:result2[0].user_id,address_id:result2[0].address_id}};


       
       


   
 } catch(e) {
   
   throw e;
 }

}
,

UpdateCred:async (data,headers)=>
  {
          
         
    try{



          var token= headers.authorization;
       
          var decoded= await jwt.verify(token, secret.key1);
          console.log(decoded);
          var newId=decoded.id;
          console.log(newId);
        


        var salt =await  bcrypt.genSalt(10);
         var hash =  await bcrypt.hash(data.password, salt);
          data.password=hash;
          
      
      data.contact= data.countryCode+data.contact;

      
   await  connection.query('UPDATE user set name=?,email=?,password=?,contact=?,modifiedAt=CURRENT_TIMESTAMP WHERE id=?',[data.name,data.email,data.password,data.contact,newId]);
    
  

    

     var result= await connection.query("select * from user where id = ?",[newId]);
     

return {'status':suc.Updated.status,message:suc.Updated.message,data:{'id':result[0].id,'email':result[0].email,'contact':result[0].contact}};    


    }
    catch(err){
      console.log(err);
      
  }
    },

    DeleteBooking:async(payload)=>{

  try {
    var cancel="cancelled";
    var Nid=payload.booking_id;

    await  connection.query('UPDATE booking set status=?,modifiedAt=CURRENT_TIMESTAMP WHERE id=?',[cancel,Nid]);
    var result= await connection.query("select * from booking where id = ?",[Nid]);
    var mng={
          user_id:result[0].user_id.toString(),
        booking_id:result[0].id.toString(),
        status:result[0].status.toString(),
        driver_id:result[0].driver_id.toString(),
        createdAt:new Date().toString(),
         modifiedAt:new Date().toString(),
       }

        var cred=dba.collection('bookingHistory');
        let myData= await  cred.update({'booking_id':result[0].id.toString()},{$set:mng});
        console.log(myData);



    return {'status':suc.Cancelled.status,message:suc.Cancelled.message,data:{'booking':result}};    
     
    
  } catch(e) {
  
    throw e;
  }



    },

    CheckBookingId:async(payload)=>{

      try {
        let result=await connection.query("select * from booking where id = ?",[payload.booking_id]);
        return result;
        
      } catch(e) {
        
        throw e;
      }



    },

    CheckAlreadyCan:async(payload)=>{

   try {
     let result=await connection.query("select * from booking where id = ?",[payload.booking_id]);
      return result;
     
   } catch(e) {
     
     throw e;
   }



    },


    GetBookingDetails:async(headers)=>{

   try 
   {        
            var token= headers.authorization;
       
          var decoded= await jwt.verify(token, secret.key1);
       
          var newId=decoded.id;
          
        let result1=await connection.query("select * from booking where user_id = ?",[newId]);
        let result2=await connection.query("select * from user where id = ?",[newId]);

        
          let result= await connection.query("SELECT booking.id AS Booking_Id,booking.status,booking.driver_id,driver.name AS DriverName,driver.contact AS DriverContact,user.name AS CustomerName,user.email AS CustomerEmail,user.contact AS CustomerContact,address.street_address AS CustomerAddress,address.city AS CustomerCity,address.pincode AS CustomerPincode ,booking.createdAt from driver  RIGHT JOIN booking ON booking.driver_id=driver.id INNER JOIN user ON booking.user_id=user.id INNER JOIN address ON booking.address_id=address.id WHERE user.id=? ORDER BY createdAt DESC ",[newId]);

       return {'status':suc.Cool.status,message:suc.Cool.message,data:{'Details':result}};    ;

        


       
     
   } 
   catch(e) {
     
     throw e;
   }






    }

    













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


