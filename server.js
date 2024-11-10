

const express = require('express');
const bodyParser = require('body-parser');
const io = require("socket.io-client");
const socket = io("wait");

const app = express();
const PORT = 3000;

// Parse URL-encoded data (application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint similar to Telegram's /sendMessage
app.post('/sendCoordinets', (req, res) => {
  const LatitudeData = req.body.Latitude;
  const longitudeData = req.body.longitude;
  const Device_Id = req.body.Device_Id;
  if (LatitudeData && longitudeData && Device_Id) {
    // Here you can handle the message, for example, log it or send a response back
    console.log(`Message received ${LatitudeData}: ${longitudeData} for ${Device_Id}`);
    socket.emit("updateLocation", {
      Device_Id,
      latitude: LatitudeData,
      longitude: longitudeData
    });
    // Respond with a JSON object similar to Telegram's response format
    res.json("sent");
  } else {
    // Respond with an error if parameters are missing
    res.status(400).json({
      ok: false,
      error_code: 400,
      description: "Bad Request: chat_id and text are required"
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
