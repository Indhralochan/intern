const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
mongoose.set("debug", true);
mongoose.set("strictQuery", false);
const options = {
  strict: "throw",
  strictQuery: false
};
let Bneg = new mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    count :{
        type : Int32,
        required:true,
    }
},options)

module.exports = mongoose.model('Bneg',Bneg)