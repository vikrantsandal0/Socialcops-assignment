
const async = require('async');
const jwt = require('jsonwebtoken');

var secret=require('../config.js');
const bcrypt=require('bcrypt');
const msg= require('../boom/boom.js').errorMessage.eng;
const suc=require('../boom/boom.js').MessageSuccess
var Ufunctions= require('../utils/universalFunctions.js');



module.exports={


   checkmail:async(mail)=>
  {
    try{
      let result=await connection.query("select * from admin where email = ?",[mail]);
      return result;

  }
  catch(err){
    console.log(err);
  }
  }
  ,


   checkpass:async (body)=>
  {
    try{
       
       var result= await connection.query("select * from admin where email = ?",[body.email]);

         var b= result[0].password;
         
        
       
   let a=await  bcrypt.compare(body.password, b);
   console.log("compare ka result");
   console.log(a);

    

    if(a==true){
      console.log(result);

var token= jwt.sign({id:result[0].id, username: result[0].name}, secret.key3, { algorithm: 'HS256'});

  

    return  {'Status':suc.Cool.status,'message':suc.Cool.message,data:{id:result[0].id,email:result[0].email,name:result[0].name},token:token};
  }


      else return msg.WrongPassword;

    }

    

    
    
  catch(err){
    console.log(err);
  }
  },

   CheckToken:async(headers)=>{

try {
      var token= headers.authorization;

  let result= await jwt.verify(token,secret.key3);
  return result;
  
} catch(e) {
  
return false;
}






},

GetAllBookings:async(payload)=>{

try {
 // var li= headers.limit;
  //console.log("yhan tk gya");

  console.log("yeh hai"+payload.limit);
  let num= payload.limit;
  console.log(typeof(payload.limit));

var result=await connection.query("SELECT booking.user_id,booking.id AS booking_id,booking.status,booking.driver_id,driver.name AS DriverName,driver.contact AS DriverContact,user.name AS CustomerName,user.email AS CustomerEmail,user.contact AS userContact,address.street_address AS CustomerAddress,address.city AS CustomerCity,address.pincode AS CustomerPincode ,booking.createdAt from driver  RIGHT JOIN booking ON booking.driver_id=driver.id INNER JOIN user ON booking.user_id=user.id INNER JOIN address ON booking.address_id=address.id ORDER BY createdAt DESC LIMIT ?",[num]); 
return {'Status':suc.Cool.status,'message':suc.Cool.message,data:{'bookings':result}};


  
} catch(e) {
  
  console.log(e);
}



},
AssignBookingDriver:async(payload,headers)=>{


 try {
   var confirmed="confirmed";
  await connection.query("UPDATE booking set driver_id=?,status=? WHERE id = ? ",[payload.driver_id,confirmed,payload.booking_id])
  var result= await connection.query("select * from booking where id = ?",[payload.booking_id]);
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


  return {'Status':suc.Cool.status,'message':suc.Assigned.message,data:{id:result[0].id,user_id:result[0].user_id,driver_id:result[0].driver_id,address_id:result[0].address_id}};



   
 } catch(e) {
   
   throw e;
 }




},


AdminGetOneUser:async(query)=>{
  try {
    let Nid=query.user_id;

    
    var result=await connection.query("SELECT user.id AS user_id,booking.id AS booking_id,booking.driver_id AS driver_id,user.name, user.email, user.contact,address.street_address,address.city,address.state,address.pincode FROM (user INNER JOIN address ON user.id= address.user_id)INNER JOIN booking ON address.id=booking.address_id WHERE user.id=? ORDER BY booking.createdAt DESC",[Nid]);
     console.log(result);
    if(result.length<1){
      return msg.UserNoBookings;
    }
    else{
      return {'Status':suc.Cool.status,'message':suc.Cool.message,data:{'User bookings':result}};
    }

    
  } catch(e) {
    
    throw e;
  }







},

CheckValidBookingId:async(bookId)=>{

try {
       let result= await connection.query("select * from booking where id = ?",[bookId]);
      return result;


  
} catch(e) {
  
  throw e;
}



},
CheckValidDriver:async(DriverId)=>{

try {
       let result= await connection.query("select * from driver where id = ?",[DriverId]);
      return result;


  
} catch(e) {
  
  throw e;
}



},
AlreadyAssigned:async(BookId)=>{

try {
       let result= await connection.query("select * from booking where id = ?",[BookId]);
       console.log("yeh hai driver id");
       console.log(typeof(result[0].driver_id));
      return result;


  
} catch(e) {
  
  throw e;
}



},
GetDrivers:async()=>{
  try {
    let result= await connection.query("select * from driver");

    var x=result.map( function(element) {
      return {'id':element.id,'name':element.name,'email':element.email,'status':element.status,'contact':element.contact};
    });
    console.log(x);
    return {'status':suc.Cool.status,'message':suc.Cool.message,data:{'all drivers':x}};
    
  } catch(e) {
    
    throw e;
  }





},

MakeGlobalSearchDriver:async(query)=>{

 try {
        let result= await connection.query("select name,email,contact,createdAt from driver WHERE name LIKE ?",['%'+query.username+'%']);


         return result;


 } catch(e) {
   
   throw e;
 }




}
,
MakeGlobalSearchUser:async(query)=>{

 try {
        let result= await connection.query("select name,email,contact,createdAt from user WHERE name LIKE ?",['%'+query.username+'%']);


         return result;


 } catch(e) {
   
   throw e;
 }




},

MakeGlobalSearchBooking:async(query)=>{

 try {
        let result= await connection.query("SELECT booking.user_id,booking.id AS booking_id,booking.status,booking.driver_id,driver.name AS DriverName,driver.contact AS DriverContact,user.name AS CustomerName,user.email AS CustomerEmail,user.contact AS userContact,address.street_address AS CustomerAddress,address.city AS CustomerCity,address.pincode AS CustomerPincode ,booking.createdAt from driver  RIGHT JOIN booking ON booking.driver_id=driver.id INNER JOIN user ON booking.user_id=user.id INNER JOIN address ON booking.address_id=address.id WHERE user.name LIKE ? ORDER BY createdAt DESC",['%'+query.username+'%'] );


         return result;


 } catch(e) {
   
   throw e;
 }




},

SendAll:async(driver, user,booking)=>{
 try {
   
   return {'status':suc.Cool.status,'message':suc.Cool.message,data:{'userDetails':user,'driverDetails':driver,'bookingDetails':booking}};


 } catch(e) {
   
   throw e;
 }





}








}




/**  CheckToken:async(headers)=>{

try {
      var token= headers.authorization;

  let result= await jwt.verify(token,secret);
  return result;
  
} catch(e) {
  
return false;
}






},

AddAddress:async(data,headers)=>

  {

    var token= headers.authorization;
         
         try{
           
         
          var decoded= await jwt.verify(token, secret);
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


