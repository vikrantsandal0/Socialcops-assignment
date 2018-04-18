module.exports={

bookingSchema:()=>{

dba.createCollection("bookingHistory", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
        
         required: [ "booking_id"],
         properties: {
           user_id: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            booking_id: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            status: {
               bsonType: "string",
               description: "must be a string and is required"
            },
             driver_id: {
               bsonType: "string",
               description: "must be a srting and is required"
            },
            
            createdAt:{
                bsonType:"string",
                description: "must be a srting and is required"
            },
            modifiedAt:{
                bsonType:"string",
                description: "must be a srting and is required"
            }
         }
      }
   },
   validationLevel:'moderate',
   validationAction:'error'
})




}




}












