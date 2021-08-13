const express = require('express');
const path = require('path');
const morgan = require('morgan');

const data = require(path.join(__dirname, './dev-data/students.json'));
const app = express();

app.use(morgan('dev'));

app.use(
	'/api/v1/students',
	require(path.join(__dirname, './routes/studentRoute'))
);

//Starting the server.
const port = 3000;
app.listen(port, () => {
	console.log(`Server started at ${port}`);
});
