
const mysql= require('async-mysql');

var config={
 
 host:'localhost',
 user:'root',
 password:'',
 database:'final3',
 port:3308

}



async function conn () {

	try {
	     global.connection= await mysql.connect(config);   

		

		console.log("you are connected to Mysql go ahead");
	    
	    
	    
	    
	    

		
	} catch(e) {
		
	throw e;
	}
 
}
conn();












