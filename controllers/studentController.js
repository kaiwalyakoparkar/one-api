const path = require('path');
const data = require(path.join(__dirname, '../dev-data/students.json'));

exports.getAllStudents = (req, res, next) => {
	res.status(200).json({
		status: 'success',
		data: {
			data,
		},
	});

	next();
};
