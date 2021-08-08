const path = require('path');
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();

//Done for the POST method
app.use(express.json());

//My custom middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//External Middleware
app.use(morgan('dev'));

const tours = require(path.join(
  __dirname,
  './dev-data/data/tours-simple.json'
));

//================ Get all tours =========================
const getAllTours = (req, res) => {
  res.json({
    status: 'success',
    requestedAt: req.requestTime,
    result: tours.length,
    data: {
      tours
    }
  });
};

//================ Get Single tour =========================
const getSingleTour = (req, res) => {
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
  if (!tour) {
    res.status(404).send({
      status: 'fail',
      message: 'Invalid ID'
    });
    return;
  }

  res.status(200).send({
    status: 'success',
    data: {
      tour
    }
  });
};

//================ Add a new tour =========================
const addNewTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;

  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    path.join(__dirname, './dev-data/data/tours-simple.json'),
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );

  // res.send('Done'); //We cannout send the reponse twice.
};

//================ Update a tour =========================
const updateSingleTour = (req, res) => {
  const id = req.params.id * 1; //get the id from request

  const tour = tours.find(ele => {
    //Find the tour from the tours array
    return ele.id === id;
  });

  //404 Error handler
  if (!tours) {
    res.status(404).send({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  //201 Respose handler
  const updatedTour = Object.assign(tour, req.body); //Update the tour

  //Write the file with the update tour and send back the updated tour
  fs.writeFile(
    path.join(__dirname, './dev-data/data/tours-simple.json'),
    JSON.stringify(tours),
    err => {
      res.status(201).send({
        status: 'success',
        data: {
          updatedTour
        }
      });
    }
  );
};

//================ Delete a tour =========================
const deleteSingleTour = (req, res) => {
  const id = req.params.id * 1; //Took the id from request

  const tour = tours.find(ele => {
    //Finding the tour from the all the of tours
    return ele.id === id;
  });

  //Handling 404 error (If no tour found with the id)
  if (!tour) {
    res.status(404).send({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  //204 Status handler
  //I will take all the tours which don't match the 'tour.id' in a single array and then overwrite the json file with this new array.

  //Create a new array of tours excluding the tour which has to be deleted
  const toursAfterDeletion = tours.filter(ele => {
    return ele.id !== tour.id;
  });

  //Rewritting the file with the new tours array.
  fs.writeFile(
    path.join(__dirname, './dev-data/data/tours-simple.json'),
    JSON.stringify(toursAfterDeletion),
    err => {
      res.status(204).send({
        status: 'success',
        data: null
      });
    }
  );
};

//================ Get all users =========================
const getAllUsers = (req, res) => {
  res.status(503).send({
    status: "error",
    message: "This route is not defined yet"
  });
}

//================ Add new users =========================
const addNewUser = (req, res) => {
  res.status(503).send({
    status: "error",
    message: "This route is not defined yet"
  });
}

//================ Get single users =========================
const getSingleUser = (req, res) => {
  res.status(503).send({
    status: "error",
    message: "This route is not defined yet"
  });
}

//================ Update single users =========================
const updateSingleUser = (req, res) => {
  res.status(503).send({
    status: "error",
    message: "This route is not defined yet"
  });
}

//================ Delete a users =========================
const deleteSingleUser = (req, res) => {
  res.status(503).send({
    status: "error",
    message: "This route is not defined yet"
  });
}

//=========== All Route Handlers (Not efficient) ===================
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getSingleTour);
// app.post('/api/v1/tours', addNewTour);
// app.patch('/api/v1/tours/:id', updateSingleTour);
// app.delete('/api/v1/tours/:id', deleteSingleTour);

//=========== All Tour Route Handlers (Efficient) =================
app
  .route('/api/v1/tours') //Common route
  .get(getAllTours) //get operation on this route
  .post(addNewTour); //post operation on this route

app
  .route('/api/v1/tours/:id') //Common route
  .get(getSingleTour) //get operation on this route
  .patch(updateSingleTour) //patch operation on this route
  .delete(deleteSingleTour); //delte operation on this route

//=========== All Users Route Handlers (Efficient) =================

app
  .route('/api/v1/users')
  .get(getAllUsers)
  .post(addNewUser);

app
  .route('/api/v1/users/:id')
  .get(getSingleUser)
  .patch(updateSingleUser)
  .delete(deleteSingleUser);

//================= Starting the server==============
const port = 3000;

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});


/*
Evolution of the routers

================ 1. Naive ===============

app.get('/route', (req, res) => {
  //Handler code
});

================ 2. Moderate ============

const handlerFunction = (req, res) => {
  //Handler Code
}

app.get('/route', handlerFunction);

================ 3. Advance =============

const handlerFunction = (req, res) => {
  //Handler code
}

app
  .route('/route')
  .get(handlerFunction)
  .otherHTTPrequest(otherHandler);
*/