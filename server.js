const mongoose = require("mongoose");
const app = require("./app");
const { DB_HOST } = require("./config");

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// mongodb+srv://Larik:<password>@cluster0.dosr8jl.mongodb.net/
