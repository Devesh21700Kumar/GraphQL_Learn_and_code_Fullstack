const mongoose = require('mongoose');
require('dotenv').config();
//using dotenv to manage ENV variables and use process.env
//the above reads the environment variable files and saves them

module.exports = async function(){
	try{
		await mongoose.connect(process.env.MONGOURL, { useUnifiedTopology: true, useNewUrlParser: true });
		console.log("Connected to DB");
	} catch(err){
		console.log("Error while connecting to DB");
		process.exit(0);
	}
}

/*The process.env global variable is injected by the Node at runtime for your application to use and it represents the 
state of the system environment your application is in when it starts.*/ 