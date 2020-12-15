const mongoose = require('mongoose');
require('dotenv').config();

module.exports = async function(){
	try{
		await mongoose.connect(process.env.MONGOURL, { useUnifiedTopology: true, useNewUrlParser: true });
		console.log("Connected to DB");
	} catch(err){
		console.log("Error while connecting to DB");
		process.exit(0);
	}
}