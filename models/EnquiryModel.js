const mongoose = require('mongoose');

const  customerSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    }, 
    message:{
        type:String,
        required:true,
    },
    company:{
        type:String,
        required:false,
    }
});

module.exports=mongoose.model("Customer",customerSchema);