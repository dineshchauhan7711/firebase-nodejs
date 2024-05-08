const express = require("express");
const app = express();
const config = require("./src/config/config");

require('./src/helper/firebase/firebase_initialize');
require('./src/helper/firebase/firebase_admin');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", require("./src/routes/index"));



app.listen(config.port, () => {
     console.log(`Server started on port ${config.port}`);
});