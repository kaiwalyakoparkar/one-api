const express = require('express');
const path = require('path');
const app = require(path.join(__dirname, './index.js'));

//Starting the server.
const port = 3000;

app.listen(port, () => {
	console.log(`Server started at ${port}`);
});
