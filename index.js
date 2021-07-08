const express  = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

app.use('/api/all', require(path.join(__dirname, './routes/route')));

app.listen(port, () => {
    console.log(`Started server on http://localhost:${port}`);
})