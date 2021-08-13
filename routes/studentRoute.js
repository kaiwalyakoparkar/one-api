const express = require('express');
const path = require('path');

const studentRecord = require(path.join(
	__dirname,
	'../controllers/studentController'
));

const route = express.Router();

route.route('/').get(studentRecord.getAllStudents);

module.exports = route;
