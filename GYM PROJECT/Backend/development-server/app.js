const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { sequelize } = require("../development-server/models");
const callApplicationRoutes = require("../development-server/routes");
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./public/")));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
const PORT = process.env.PORT;

// require('./DB/db')

app.use(express.static(path.join(__dirname, "./build")));

// app.use(require('./routes/index'));
callApplicationRoutes(app);
// Reactjs

// app.use((req, res, next) => {
//     if(req.path.startsWith("/v1/"))
//         res.sendFile(path.join(__dirname, "./build", "index.html"));
//     else
//         next()
// });

app.get("/", (req, res) => {
  console.log("GET");
  res.send("Hello World");
});

const connectDB = async () => {
  console.log("Checking Database Connection...!");
  try {
    await sequelize.sync({ alter: true });
    console.log("Database Connection Established");
  } catch (e) {
    console.log("Database Connection Failed", e);
    process.exit(1);
  }
};

(async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Port listening at ${PORT}`);
  });
})();
