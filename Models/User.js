const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

name :{ 
    type:String,
    required:true
},

avatar :{
    type:String,
    default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
},

email:{
    type:String,
}
})

module.exports = mongoose.model('user',UserSchema);
