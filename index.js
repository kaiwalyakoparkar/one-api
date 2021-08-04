const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

const port = 3000;

const tours = require(path.join(__dirname, './dev-data/data/tours-simple.json'));

//Done for the POST method
app.use(express.json());

app.get('/api/v1/tours', (req, res) => {
	res.json({
		status: 'success',
		result: tours.length,
		data: {
			tours
		}
	});
});

app.post('/api/v1/tours', (req, res) => {
	// console.log(req.body);

	const newId = (tours[tours.length - 1].id)+1;

	const newTour = Object.assign({id: newId}, req.body);

	tours.push(newTour);

	fs.writeFile(path.join(__dirname, './dev-data/data/tours-simple.json'), JSON.stringify(tours), err => {
		res.status(201).json({
			status:"success",
			data: {
				tour: newTour
			}
		})
	})

	// res.send('Done'); //We cannout send the reponse twice.
})

app.listen(port, () => {
	console.log(`Server started on http://localhost:${port}`);
});