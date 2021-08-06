const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

const port = 3000;

const tours = require(path.join(__dirname, './dev-data/data/tours-simple.json'));

//Done for the POST method
app.use(express.json());

//================ Get all tours =========================
app.get('/api/v1/tours', (req, res) => {

	res.json({
		status: 'success',
		result: tours.length,
		data: {
			tours
		}
	});
});

//================ Get Single tours =========================
app.get('/api/v1/tours/:id', (req, res) => {
	// console.log(req.params);

	const id = req.params.id * 1;


	//tours.find will return an object so we can access value using eg (tour.id)
	const tour = tours.find(ele => {
		return ele.id === id;
	});

	//tours.filter will return an array of oject (Although only one) so we can access value using eg (tour[0].id)
	// const tour = tours.filter(ele => {
	// 	return ele.id === id;
	// });


	// if(id > tours.length){ //This is also one of the way to check invalid url
	if(!tour){
		res.status(404).send({
			status: "fail",
			message: "Invalid ID"
		});
		return;
	}


	res.status(200).send({
		status: "success",
		data: {
			tour
		}
	})
});


//================ Add a new tours =========================
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

//================ Update a tours =========================
app.patch('/api/v1/tours/:id', (req, res) => {

	const id = req.params.id * 1;//get the id from request

	const tour = tours.find(ele => {//Find the tour from the tours array
		return ele.id === id;
	});

	//404 Error handler
	if(!tours){
		res.status(404).send({
			status: "fail",
			message: "Invalid ID"
		});
	}

	//201 Respose handler
	const updatedTour = Object.assign(tour, req.body);//Update the tour

	//Write the file with the update tour and send back the updated tour
	fs.writeFile(path.join(__dirname,'./dev-data/data/tours-simple.json'), JSON.stringify(tours), err => {

		res.status(201).send({
			status: "success",
			data: {
				updatedTour
			}
		});

	});
});

app.listen(port, () => {
	console.log(`Server started on http://localhost:${port}`);
});