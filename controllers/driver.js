const services = require('../services');
const suc=require('../boom/boom.js').MessageSuccess;
const msg= require('../boom/boom.js').errorMessage.eng;




const async = require('async');

module.exports={


  AddEntry :async(payload)=>{

    try{

    let email=await services.driver.check(payload.email);

    console.log(email.length);
    if(email.length>0){

       return msg.emailExit;
    }
    else{
      let phone= await services.driver.checkPhone(payload.contact,payload.countryCode);
      console.log("yeh check hai phone ka");
      console.log(phone.length);
      if(phone.length>0){
        return msg.phoneExit;
      }
      else{
        return services.driver.AddData(payload);

      }
    }
    
  }

  catch(err){
    console.log(err);
  }
  },

  Verify:async(payload)=>{
    try {
      let email=await services.driver.check(payload.email);
      if(email.length<1){
        return msg.userNotFounD;

      }
      else{
        return await services.driver.verifyOtp(payload);

      }
      
      
    } catch(e) {
      
      throw e;
    }




  },


   Login : async(body)=>
  {
    let mail= await services.driver.checkmail(body.email);
    if(mail.length<1)
      return msg.userNotFounD;
    let status=await services.driver.checkpass(body);
    console.log(status);
  return status;

    
  },
  GetallForDriver:async(payload,headers)=>{

  try {
    let Checked= await services.driver.CheckToken(headers);
    if(Checked){
      return await services.driver.GetAllBookingsForDriver(headers,payload);
    }
    else {
      return  msg.InvalidToken;
    }

    

  }
   catch(e) {
   
    throw e;
  }



},




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
  
}
