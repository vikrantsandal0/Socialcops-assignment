const Boom = require('boom')

module.exports = {

    errorMessage: {
        eng: {
            emailExit: Boom.conflict("Email Already exist"),
            phoneExit:Boom.conflict("Phone Already exist"),
            invalidCredentials: Boom.unauthorized("Invalid Credentials"),
            userNotFound: Boom.notFound("User Not found"),
            InvalidToken:Boom.unauthorized("invalid token"),
            userNotFounD:Boom.notFound("This user is not Registered"),
            AddressNotFound: Boom.notFound("Address Not found"),
            AlreadyVerified:Boom.conflict("Already verified"),
            InvalidOtp:Boom.conflict("Otp invalid"),
            NotVerified:Boom.conflict("The user is not verified"),
            WrongPassword:Boom.conflict("Wrong password"),
            WrongAdminEmail:Boom.conflict("Wrong admin email") ,
             UserNoBookings:Boom.conflict("Invalid id /or no bookings on this user")   ,
             NoSuchBookingId:Boom.conflict("No such booking id exists") ,
               NoSuchDriverId:Boom.conflict("No such driver id exists") ,
               DriverAlready:Boom.conflict("driver already assigned") ,
                AlreadyCancelled:Boom.conflict("booking already cancelled"), 
                DriverNotVerified:Boom.conflict("driver is not verified"),



        }
    },
    MessageSuccess:{
     Cool:{
       status:200,
       message:"success"
     }
     
     

     


   }
}