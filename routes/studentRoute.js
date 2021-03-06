const express = require('express');
const path = require('path');
// const logHandler = require('../logHandler.js');

const studentRecord = require(path.join(
	__dirname,
	'../controllers/studentController'
));

const route = express.Router();

// logHandler.log(logHandler.level, logHandler.message);

//get request (all students)
route
	.route('/')
	.get(studentRecord.getAllStudents)
	.post(studentRecord.addStudent);

route
	.route('/:id')
	.get(studentRecord.getSingleStudent)
	.patch(studentRecord.updateStudent)
	.delete(studentRecord.deleteStudent);

module.exports = route;
