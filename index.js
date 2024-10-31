const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json())

const STATUS_FILE = "status.json";

app.get("/status", (req, res) => {
    fs.readFile(STATUS_FILE, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Could not fetch status :("});
        }
        res.json(JSON.parse(data));
    });
});