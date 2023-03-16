const app = require("./app");
const Loaders = require("./Models");

Loaders.start();

app.listen(3333, () => console.log("Deu certo porta 3333"));
