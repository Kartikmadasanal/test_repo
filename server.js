



import express from "express";
import bodyParser from "body-parser"

import TelegramBot from "node-telegram-bot-api";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
const token = '7783621581:AAGc-KnO6_W9RZrZhEGjk8BCAZPQrXRYBNc';

const bot = new TelegramBot(token, {polling: true});

app.get("/", (req, res) => {

    res.json("hello this get");
});
app.post("/", (req, res) => {

    res.json("hello this is post");
});
app.post("/iotp", (req, res) => {

    console.log(req.body);
    
    const message = `Received coordinates: Latitude = ${req.body.Latitude}, Longitude = ${req.body.Longitude}`;
    
    // Send message to the specified Telegram user or group
    bot.sendMessage('@jcernew', message)
        .then(() => {
            res.send(`Message sent: ${message}`);
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send(`Failed to send message: ${err.message}`);
        });
});

app.get("/iotg", (req, res) => {

    console.log(req.body);
    
    const message = `Received coordinates: Latitude = ${req.body.Latitude}, Longitude = ${req.body.Longitude}`;
    
    // Send message to the specified Telegram user or group
    bot.sendMessage('@jcernew', message)
        .then(() => {
            res.send(`Message sent: ${message}`);
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send(`Failed to send message: ${err.message}`);
        });
});

app.listen(port, () => {
    console.log("Server is listening on port " + port);
});

