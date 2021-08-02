const path = require('path');
const express = require('express');
const app = express();

const port = 5000;

const tours = require(path.join(__dirname, './dev-data/data/tours-simple.json'));

app.get('/api/v1/tours', (req, res) => {
	res.json({
		status: 'success',
		result: tours.length,
		data: {
			tours
		}
	});
});

app.listen(port, () => {
	console.log(`Server started on http://localhost:${port}`);
});