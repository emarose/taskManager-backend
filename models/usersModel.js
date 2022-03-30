const mongoose = require("../bin/mongodb");
const errorMessage = require("../util/errorMessage")
const validation = require("../util/validators")
const usersSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,errorMessage.GENERAL.campo_obligatorio],
    },
    email:{
        type:String,
        required:[true,errorMessage.GENERAL.campo_obligatorio],
        unique:true
    },
    password:{
        type:String,
        required:[true,errorMessage.GENERAL.campo_obligatorio],
        validate:{
            validator:function(value){
                return validation.isGoodPassword(value)
            },
            message:errorMessage.USERS.passwordIncorrect
        }
    }
});

module.exports = mongoose.model("users", usersSchema)