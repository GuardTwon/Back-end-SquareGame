const express = require("express");
require("dotenv").config();
const cors=require('cors')
const { dbConnection } = require("./database/config");

const app = express();

dbConnection();

app.use(cors())

app.use(express.static("public"));

app.use(express.json());
// Rutas
app.use("/api/auth", require("./routes/auth"));
app.use('/api/scores', require('./routes/scores'))

app.listen(process.env.PORT, () => {
  console.log(`Server On ${process.env.PORT}`);
});
