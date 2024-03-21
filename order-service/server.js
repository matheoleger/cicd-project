const express = require('express');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(cors());

app.get('/order', (req, res) => {
  res.json({ message: 'Hello depuis le service Order' });
});

app.listen(port, () => {
  console.log(`Order Service accessible via http://localhost:${port}`);
});