const app = require("./app");
const { PORT, BD_HOST } = require("./helpers/env");
const mongoose = require("mongoose");

mongoose
  .connect(BD_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .then(() => console.log(`Server running. Use our API on port: ${PORT}`))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
