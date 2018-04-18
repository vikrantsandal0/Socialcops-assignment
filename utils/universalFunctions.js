
var bcrypt=require('bcrypt');
var twilio= require('twilio');

 var convert =async function CreateHash(password) {
	var salt =await  bcrypt.genSalt(10);
var hash =await  bcrypt.hash(password, salt);
return hash;
	
}


var twilioWork=async function twil(userContact,otp) {
var accountSid = 'AC6144192f7f6692e2e7be34dc6f1ba3d5'; // Your Account SID from www.twilio.com/console
var authToken = '81df63ebf28117b50fdf1345749277ad';   // Your Auth Token from www.twilio.com/console


var client = new twilio(accountSid, authToken);

client.messages.create({
    body: otp,
    to: userContact,  // Text this number
    from: '+18589436814 ' // From a valid Twilio number
})
.then((message) => console.log(message.body));





}


 
 module.exports={
 	convert:convert,
 	twilioWork: twilioWork
 }