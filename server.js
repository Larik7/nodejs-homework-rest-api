const mongoose = require("mongoose");
const app = require("./app");
const { DB_HOST } = require("./config");
mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// mongodb+srv://Larik:<password>@cluster0.dosr8jl.mongodb.net/
