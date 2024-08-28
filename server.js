import express from "express";
import TelegramBot from "node-telegram-bot-api";

const app = express();
const port = 3000;
const token = '7512867048:AAFDxc8EhxcQGffDHI-xjjYvw1P3_WQUVzE';

const bot = new TelegramBot(token, {polling: true});

app.get("/iot/:lat/:lag", (req, res) => {
    console.log(req.params);
    
    // Convert req.params to a readable string format
    const message = `Received coordinates: Latitude = ${req.params.lat}, Longitude = ${req.params.lag}`;
    
    // Send message to the specified Telegram user or group
    bot.sendMessage('@jcernew', message)
        .then(() => {
            res.send(`Message sent: ${message}`);
        })
        .catch((err) => {
            res.status(500).send(`Failed to send message: ${err.message}`);
        });
});

app.listen(port, () => {
    console.log("Server is listening on port " + port);
});
