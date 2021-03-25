const express = require('express');
const bp = require('body-parser');
const path = require('path');

const PORT = 3333;
const app = express();

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(bp.json());

app.listen(PORT, () => { console.log(`You are now listening to ${PORT} radio`) })