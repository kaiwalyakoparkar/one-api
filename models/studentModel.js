const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Student should have a unique name']],
	},
	age: Number,
	rollNo: {
		type: Number,
		required: [true, 'Student should have a unique rollno'],
		unique: true,
	},
	foi: String,
	dob: Number,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
