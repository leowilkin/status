const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

let currentStatus = "Waiting for a new status update...";

const API_KEY = process.env.API_KEY;

function authenticate(req, res, next) {
    const apiKey = req.headers["x-api-key"];
    if (apiKey && apiKey === API_KEY) {
        next();
    } else {
        res.status(403).json({ message: "hmm, nope. wrong password." });
    }
}

app.get("/status", (req, res) => {
    res.json({ status: currentStatus });
});

app.post("/status", authenticate, (req, res) => {
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: "there's no status there :(" });
    }

    currentStatus = status;
    res.json({ message: "yay! status updated!", status: currentStatus });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//ewwor handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
