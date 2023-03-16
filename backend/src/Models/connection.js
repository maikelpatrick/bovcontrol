const mongoose = require('mongoose');
async function startDB(){
    await mongoose.connect('mongodb://127.0.0.1:27017/bov');
}

module.exports = startDB;