const express = require("express");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json())

const STATUS_FILE = "status.json";
const API_KEY = process.env.API_KEY;

//middleware
function authenticate(req, res, next) {
    const apiKey = req.headers["x-api-key"];
    if (apiKey && apiKey === API_KEY) {
        next();
    } else {
        res.status(403).json({ message: "whoops. looks like you haven't authenticated!" });
    }
}

//fetch data
app.get("/status", (req, res) => {
    fs.readFile(STATUS_FILE, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Could not fetch status :("});
        }
        res.json(JSON.parse(data));
    });
});

//auth to change data
app.post("/status", authenticate, (req, res) => {
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: "aww there's no status there :("})
    }

    fs.writeFile(STATUS_FILE, JSON.stringify({ status }), (err) => {
        if (err) {
            return res.status(500).json({ message: "just couldn't do it ;("});
        }
        res.json({ message: "updated!", status});
    });
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

module.exports = app;