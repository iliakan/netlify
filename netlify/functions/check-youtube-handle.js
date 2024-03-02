const axios = require('axios');
const express = require('express');
const serverless = require('serverless-http');

const app = express();

app.get('/check-youtube-handle/:handle', async (req, res) => {
  const { handle } = req.params;
  const url = `https://www.youtube.com/${handle}`;

  console.log("HERE");
  
  try {
    const response = await axios.get(url);
    console.log(response);

    // If the request is successful, the channel exists
    if (response.status === 200) {
      res.json({ handle, exists: true });
    } else {
      res.json({ handle, exists: false });
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.json({ handle, exists: false });
    } else {
      res.status(500).json({ error: 'Error checking handle' });
    }
  }
});

module.exports.handler = serverless(app);
