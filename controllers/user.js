const services = require('../services');
const suc=require('../boom/boom.js').MessageSuccess;
const msg= require('../boom/boom.js').errorMessage.eng;
const async = require('async');

module.exports={


  AddEntry :async(payload)=>{

    try{

    let email=await services.user.check(payload.email);

    console.log(email.length);
    if(email.length>0){

       return msg.emailExit;
    }
    else{
      let phone= await services.user.checkPhone(payload.contact,payload.countryCode);
      console.log("yeh check hai phone ka");
      console.log(phone.length);
      if(phone.length>0){
        return msg.phoneExit;
      }
      else{
        return services.user.AddData(payload);

      }
    }
    
  }

  catch(err){
    console.log(err);
  }
  },


   Login : async(body)=>
  {
    try{
      let mail= await services.user.checkmail(body.email);
    if(mail.length<1)
      return msg.userNotFound;
    let status=await services.user.checkpass(body);
    console.log(status);
  return status;
    }
    catch(e){
      throw e;
    }
    

    
  },

  ApplyPatch:async(payload,headers)=>{

     try{
         let Checked= await services.user.CheckToken(headers);
        if(Checked){

       let patch=await services.user.ReturnPatch(payload);
       return patch;
       }
       else{
          return msg.InvalidToken;
        }


     }catch(e){

      throw e;
       }
  },



  thumbnail:async(payload,headers)=>{
    try{
       let Checked= await services.user.CheckToken(headers);
       console.log(Checked,"****token checked  result");
        if(Checked){

       console.log("andr gya???");
       let image =await services.user.DownloadImage(payload);
        console.log("return in controllers", image);
       return image ;

       }
       else{
        console.log("gyaaa kya else");
          return false;
          
        }



    }catch(e){
      throw e;


    }






  }

 
  
}
