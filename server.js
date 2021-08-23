const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = require(path.join(__dirname, './index.js'));

//Starting the server.
const port = process.env.PORT;

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('MongoDB connected successfully');
	});

app.listen(port, () => {
	console.log(`Server started at ${port}`);
});
