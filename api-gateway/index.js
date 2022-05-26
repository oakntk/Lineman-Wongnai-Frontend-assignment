const express = require('express');
const app = express();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
var cors = require('cors');

app.use(cors());

app.get('/api/trips', async (req, res) => {

    const keyword = req.query.keyword;
    const response = await fetch(`http://localhost:9000/trips?q=${keyword}`);
    const data = await response.json();

    console.log(data);
    res.send(data);
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});