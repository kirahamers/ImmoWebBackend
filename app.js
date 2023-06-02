//moet helemaal vanboven
require("dotenv").config();

//core module
const path = require("path");
//third party modules geïnstalleerd via npm
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

//definiëren en importeren van routes
//lokale modules
const indexRouter = require("./routes/index");
const pandenRouter = require("./routes/panden");
//const pandregioRouter = require("./routes/pandregio");
const regioRouter = require("./routes/regio");
const typepandenRouter = require("./routes/typepanden");
const afbeeldingRouter = require("./routes/afbeelding");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log(`Er is een request gedaan naar ${req.url} met IP: ${req.ip}`);
  next();
});

//koppelen van paden aan routes
app.use("/", indexRouter);
app.use("/panden", pandenRouter);
app.use("/regio", regioRouter);
app.use("/typepanden", typepandenRouter);
app.use("/afbeeldingen", afbeeldingRouter);

//fallback voor routes die niet bestaan (locatie is belangrijk)
app.all("*", (req, res) => {
  res.status(404).send("Pagina niet gevonden");
});

module.exports = app;
