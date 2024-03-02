const axios = require('axios');
const express = require('express');
const serverless = require('serverless-http');

const app = express();

app.get('/check-youtube-handle/:handle', async (req, res) => {
  const { handle } = req.params;

  try {
    await axios.get(`https://www.youtube.com/${handle}`);

    // If the request is successful, the channel exists
    res.json({ handle, exists: true });
    return;
  } catch (error) {

    if (error.response && error.response.status === 404) {
      try {
        await axios.get(`https://www.youtube.com/@${handle}`);
        res.json({ handle, exists: true });
        return;
      } catch(error) {
        if (error.response && error.response.status === 404) {
          res.json({ handle, exists: false });
          return;
        } else {
          throw error;
        }
      }
    } else {
      res.status(500).json({ error: 'Error checking handle' });
    }
  }
});

module.exports.handler = serverless(app);
