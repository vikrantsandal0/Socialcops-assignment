
const mysql= require('async-mysql');
const AdminInit=require('./utils/sqlQueries.js');
var config={
 
 host:'localhost',
 user:'root',
 password:'',
 database:'final2',
 port:3308

}



async function conn () {

	try {
	     global.connection= await mysql.connect(config);   

		

		console.log("you are connected to Mysql go ahead");
	    
	    
	    
	    var result=await	AdminInit.initAdmin();
	    console.log(result);

		
	} catch(e) {
		
	throw e;
	}
 
}
conn();












