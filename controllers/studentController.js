const path = require('path');
const fs = require('fs');
const data = require(path.join(__dirname, '../dev-data/students.json'));

exports.checkId = (req, res, next, val) => {
	if (req.params.id >= data.length) {
		res.send(404).json({
			status: 'fail',
			message: 'Invalid Id',
		});
	}

	next();
};

exports.getAllStudents = (req, res) => {
	res.status(200).json({
		status: 'success',
		data: {
			data,
		},
	});
};

exports.getSingleStudent = (req, res) => {
	const studentData = data.filter((e) => {
		return e.id == req.params.id;
	});

	res.status(200).json({
		status: 'success',
		data: {
			studentData,
		},
	});
};

exports.addStudent = (req, res) => {
	if (!req.body.name) {
		res.status(503).json({
			status: 'error',
			message: 'you should provide a body to a post request',
		});
	}

	const newStudentId = data[data.length - 1].id + 1;
	const newStudentData = Object.assign({ id: newStudentId }, req.body);

	data.push(newStudentData);

	fs.writeFile(
		path.join(__dirname, '../dev-data/students.json'),
		JSON.stringify(data),
		(err) => {
			res.status(201).json({
				status: 'success',
				data: {
					newStudentData,
				},
			});
		}
	);
};

exports.updateStudent = (req, res) => {
	const findStudentDataToUpdate = data.find((e) => {
		return e.id == req.params.id;
	});

	const updatedStudent = Object.assign(findStudentData, req.body);

	fs.writeFile(
		path.join(__dirname, '../dev-data/students.json'),
		JSON.stringify(data),
		(err) => {
			res.status(201).json({
				status: 'success',
				data: {
					updatedStudent,
				},
			});
		}
	);
};

exports.deleteStudent = (req, res) => {
	const id = req.params.id * 1;

	const findStudentDataToDelete = data.find((e) => {
		return e.id === id;
	});

	const excludeStudentDataToDelete = data.filter((e) => {
		return e.id !== findStudentDataToDelete.id;
	});

	// console.log(excludeStudentDataToDelete);

	fs.writeFile(
		path.join(__dirname, '../dev-data/students.json'),
		JSON.stringify(excludeStudentDataToDelete),
		(err) => {
			res.status(204).json({
				status: 'success',
				data: null,
			});
		}
	);
};
