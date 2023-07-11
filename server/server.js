const express = require("express");
const cors = require("cors");

const app = express();
var corsOptions = {
  origin: "http://localhost:8090"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the Music database!");
  })
  .catch(err => {
    console.log("Cannot connect to the Music database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Benvenuti sul server Node." });
});

require("./app/routes/infos.routes")(app);

require("./app/routes/user.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
