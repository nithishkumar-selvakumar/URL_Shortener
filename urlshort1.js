const mongoose = require('mongoose');
const urlschema = mongoose.Schema({
    longurl: {
        type : String,
        required : true
    },
    shorturl:{
        type : String,
        unique: true
    },
    clickcount:{
        type : Number,
        default : 0
    },
    reference:{
            type : String,
            required : true
        }
    
})
const urlmodel = mongoose.model('urlshort1',urlschema);
                                //=>urlshort1 = db-collection name
module.exports = {urlmodel}; // object destructuring model                                