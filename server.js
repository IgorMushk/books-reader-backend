const mongoose = require("mongoose");

const app = require('./app')

//const {DB_HOST} = require("./config");

//console.log(process.env);

const {DB_HOST, PORT = 3000} = process.env;
//console.log("DB_HOST : ", process.env.DB_HOST);

mongoose.connect(DB_HOST)
    .then(() => app.listen(PORT))
    .catch(error => {
      console.log(error.message);
      process.exit(1);
    });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })
