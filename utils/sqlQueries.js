
var Ufunctions= require('./universalFunctions.js');









 




var initAdmin= async function init() {
	try {


		const name1="vikrant";
const email1="vikrant@gmail.com";
const password1=await Ufunctions.convert("vikrant123");
const contact1="+919501910623";


const name2="rohan";
const email2="rohan@gmail.com";
const password2=  await Ufunctions.convert("rohan123");
const contact2="+911234567890";
		
		
		var result1=await connection.query(`INSERT INTO admin (name,email,password,contact)
            SELECT * FROM (SELECT ?,?,?,?) AS tmp
            WHERE NOT EXISTS (SELECT name FROM admin WHERE email = ?) LIMIT 1`,[name1,email1,password1,contact1,email1]);

		
	var result2= await connection.query(`INSERT INTO admin (name,email,password,contact)
            SELECT * FROM (SELECT ?,?,?,?) AS tmp
            WHERE NOT EXISTS (SELECT name FROM admin WHERE email = ?) LIMIT 1`,[name2,email2,password2,contact2,email2]);


		return result1+result2;
	} catch(e) {
		// statements
		console.log(e);
	}
	
	
	
}
module.exports={
	initAdmin: initAdmin
}