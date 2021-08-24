const mongoose = require('mongoose');
const Student = require('../models/studentModel.js');

exports.getAllStudents = async (req, res) => {
	try {
		const allStudents = await Student.find();

		res.status(200).json({
			status: 'success',
			data: {
				allStudents,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err,
		});
	}
};

exports.getSingleStudent = async (req, res) => {
	try {
		const singleStudent = await Student.findById(req.params.id);

		res.status(200).json({
			status: 'success',
			data: {
				singleStudent,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err,
		});
	}
};

exports.addStudent = async (req, res) => {
	try {
		const addedStudent = await Student.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				addedStudent,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err,
		});
	}
};

exports.updateStudent = async (req, res) => {
	try {
		const updatedStudent = await Student.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);

		res.status(201).json({
			status: 'success',
			data: {
				updatedStudent,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err,
		});
	}
};

exports.deleteStudent = async (req, res) => {
	try {
		await Student.findByIdAndDelete(req.params.id);
		res.status(204).json({
			status: 'success',
			data: null,
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err,
		});
	}
};
