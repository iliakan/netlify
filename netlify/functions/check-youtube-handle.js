const axios = require('axios');
const express = require('express');
const serverless = require('serverless-http');

const app = express();

app.get('/check-youtube-handle/:handle', async (req, res) => {
  const { handle } = req.params;

  try {
    const response = await axios.get(`https://www.youtube.com/${handle}`);
    console.log(response);

    // If the request is successful, the channel exists
    if (response.status === 200) {
      res.json({ handle, exists: true });
    } else {
      const response = await axios.get(`https://www.youtube.com/@${handle}`);
      if (response.status === 200) {
        res.json({ handle, exists: true });
      }
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
