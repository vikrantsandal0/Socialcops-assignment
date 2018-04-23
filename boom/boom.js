const Boom = require('boom')

module.exports = {

    errorMessage: {
        eng: {
            emailExit: Boom.conflict("Email Already exist"),
            phoneExit:Boom.conflict("Phone Already exist"),
            invalidCredentials: Boom.unauthorized("Invalid Credentials"),
            userNotFound: Boom.notFound("User Not found"),
            InvalidToken:Boom.unauthorized("invalid token"),
            AlreadyVerified:Boom.conflict("Already verified"),
            WrongPassword:Boom.conflict("Wrong password"),
            



        }
    },
    MessageSuccess:{
     Cool:{
       status:200,
       message:"success"
     },

     Deleted:{
        status:200,
        message:"Successfully deleted"
     },
     Updated:{
        status:200,
        message:"Successfully Updated"
     },
     Verified:{
        status:200,
        message:"Successfully verified"
     },
     Created:{
        status:200,
        message:"Successfully created booking, Wait till you are assigned a driver"
     },
     Assigned:{
        status:200,
        message:"Driver assigned ready to go"
     },
       NoAssigned:{
        status:200,
        message:"You have no bookings yet"
     },
     Cancelled:{
        status:200,
        message:"Successfully cancelled"
     },
     Wait:{
        status:200,
        message:"Comfirmation pending, wait while we assign you a driver"
     },
     
      Confirmed:{
        status:200,
        message:"Booking confirmed, driver on its way"
     },

     


   }
}