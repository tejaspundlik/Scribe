const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
require("./connection");

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

const authRouter = require("./routes/auth");
const modelRouter = require("./routes/model");
const documentRouter = require("./routes/document");

app.use("/auth", authRouter);
app.use("/model", modelRouter);
app.use("/document", documentRouter);

app.listen(process.env.PORT, () => {
  console.log(`Working On Port ${process.env.PORT}`);
});
