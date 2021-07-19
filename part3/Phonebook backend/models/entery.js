let mongoose=require("mongoose");
let Schema=mongoose.Schema;

const enterySchema=new Schema({
    name:{type: String, unique: true},
    number:{type: String},
    show:{type: Boolean},
},{ collection: 'enteries' });

const Entery=mongoose.model("enteries",enterySchema);
module.exports=Entery;