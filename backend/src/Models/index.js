const startDB = require("./connection");

class Loaders {
    start(){
        startDB();
    }
}

module.exports = new Loaders();