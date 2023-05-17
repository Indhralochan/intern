const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
mongoose.set("debug", true);
mongoose.set("strictQuery", false);
const options = {
  strict: "throw",
  strictQuery: false
};
let Os = new mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    count :{
        type : String,
        required:true,
    }
},options)

module.exports = mongoose.model('Os',Os)