// uruchamianie servera: node server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/save-data', (req, res) => {
  const data = JSON.stringify(req.body);

  fs.appendFile('E:\\Angular\\key.json', data + ',\n', (err) => {
    if (err) {
      console.error('Error Save:', err);
      res.status(500).json({ error: 'Error Save' });
    } else {
      console.log('Save Success');
      res.json({ message: 'Save Success' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server run in port: 3000');
});
