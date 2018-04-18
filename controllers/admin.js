const services = require('../services');
const suc=require('../boom/boom.js').MessageSuccess;
const msg= require('../boom/boom.js').errorMessage.eng;




const async = require('async');

module.exports={



   Login : async(body)=>
  {
     try {
       
       let mail= await services.admin.checkmail(body.email);
       console.log(mail.length);
    if(mail.length<1){
      return msg.WrongAdminEmail;
    }
    else{
    let status=await services.admin.checkpass(body);
    console.log(status);
  return status;
}
     }
      catch(e) {
    
      throw e;
     }
    
    
  },

Getall:async(payload,headers)=>{

  try {
    let Checked= await services.admin.CheckToken(headers);
    if(Checked){
      return await services.admin.GetAllBookings(payload);
    }
    else {
      return  msg.InvalidToken;
    }

    

  }
   catch(e) {
   
    throw e;
  }



},


AssignDriver:async(payload,headers)=>{

try {
   let Checked= await services.admin.CheckToken(headers);
    if(Checked){
      let valid= await services.admin.CheckValidBookingId(payload.booking_id);

       if(valid.length<1){
        return  msg.NoSuchBookingId;
       }
       else{
        let valid2= await  services.admin.CheckValidDriver(payload.driver_id);
        if(valid2.length<1){
          return  msg.NoSuchDriverId;

        }
        else if(valid2[0].status==0){
          return msg.DriverNotVerified;
        }
        else{
          let valid3= await  services.admin.AlreadyAssigned(payload.booking_id);
           if(valid3[0].driver_id==""){
            return await services.admin.AssignBookingDriver(payload,headers);


           }

         else{
          return msg.DriverAlready;
         }
        }
        
       }

       
    }
    else{
      return msg.InvalidToken;
    }

  
} catch(e) {
  
  throw e;
}





},

GetOneUser:async(query,headers)=>{

try {
  let Checked= await services.admin.CheckToken(headers);
  if(Checked){
   return await services.admin.AdminGetOneUser(query);

  }
  else{
    return msg.InvalidToken;
  }

  
}
 catch(e) {
  
  throw e;
}





},

GetAllDrivers:async(headers)=>{
   
   try {
     let Checked= await services.admin.CheckToken(headers);
     if(Checked){
      return await services.admin.GetDrivers();


     }
     else{
      return msg.InvalidToken;
     }

     
   } catch(e) {
     
      throw e;
   }
   



},

GlobalSearch:async(headers,query)=>{

 try {
      let Checked= await services.admin.CheckToken(headers);
      if(Checked){
      let driver=  await services.admin.MakeGlobalSearchDriver(query);
      let user= await services.admin.MakeGlobalSearchUser(query);
      let booking= await services.admin.MakeGlobalSearchBooking(query);
       return await services.admin.SendAll(driver,user,booking);

      }
      else{
        return msg.InvalidToken;
      }

   
 } catch(e) {
   
   throw e;
 }




}








  }





   /**  getOne :async(headers)=>{

    try{

       let Checked= await services.job.CheckToken(headers);
       if(Checked){

        let Man=await services.user.CheckId(headers);
    if(!Man)

     return msg.emailExit;


    return services.user.GetOnlyOne(headers);

       }
       else{
        return msg.InvalidToken;
       }

    
  }

  catch(err){
    console.log(err);
  }
  },



























  update:async(payload,headers)=>{
    try{
         let Checked= await services.job.CheckToken(headers);
         if(Checked){
           let email=await services.user.check(payload.email);
      if(!email)
       return  msg.userNotFound
      let updated=await services.user.updateUser(payload,headers);
      console.log("yhan se hai start update");
      console.log(updated)

      if(updated)
        return updated;
         }

         else {
          return msg. InvalidToken
           
         }




     
    }
    catch(err){
      throw  err;
    }
  },


  getAll : async()=>
  {

    try{
    let all = await services.user.getAllUsers();
    return all;
  }
  catch(err){
    throw  err;
  }
  },


  remove:async(headers)=>{
    try{
      let Checked= await services.job.CheckToken(headers);
      if(Checked){
         let status=await services.user.deleteUser(headers);
    if(status)
     return suc.Deleted;

      }
      else{
        return msg.InvalidToken;

      }
   

   
      }
      catch(err)
    {
  throw  err;
    }
    }
  ,

   Login : async(body)=>
  {
    let mail= await services.user.checkmail(body.email);
    if(!mail)
      return msg.invalidCredentials;
    let status=await services.user.checkpass(body);
    console.log(status);
  return status;

    
  }
  **/
  

