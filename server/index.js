const express = require("express");

const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const db = require('./config/db')


const {
    readdirSync
} = require("fs");

const app = express();


// check database connection
db.checkConnection()


app.use(morgan("dev"));
app.use(bodyParser.json({
    limit: "2mb"
}));
app.use(cors());

readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

const PORT = 3080;

app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`));