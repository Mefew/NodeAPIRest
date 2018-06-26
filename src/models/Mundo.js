const mongoose = require('../database');

const MundoSchema = new mongoose.Schema({   
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    fundo:{
        type: Number
    },
    titulo:{
        type: String
    },
    texto:{
        type: String
    },
    chao:{
        type: Number
    },
    fome:{
        type: Number
    },
    solidao:{
        type: Number
    },
    tristeza:{
        type: Number
    },
    sono:{
        type: Number
    }
});


const Mundo  = mongoose.model('Mundo', MundoSchema);

module.exports = Mundo;