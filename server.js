const mongoose = require("mongoose");
const app = require("./app");
// const { DB_HOST } = require("./config");
const DB_HOST =
  "mongodb+srv://Larik:UdPnuu4BET3Fff1t@cluster0.dosr8jl.mongodb.net/my_contacts?retryWrites=true&w=majority";
mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

// mongodb+srv://Larik:<password>@cluster0.dosr8jl.mongodb.net/
