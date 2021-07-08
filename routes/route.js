const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const data = require(path.join(__dirname, '../data/schoolData.js'));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/home.html'));
});
router.get('/api/all', (req, res) => {
    res.status(200).send(data);
});

router.get('/api/student/all', (req, res) => {
    res.status(200).send(data.student);
});

router.get('/api/student/name/:name', (req, res) => {
    const MyStudent = data.student.filter((e) => {
        return e.name == req.params.name;
    });

    res.status(200).send(MyStudent);
});

router.get('/api/student/rollno/:roll', (req, res) => {
    const MyStudent = data.student.filter((e) => {
        return e.rollno == parseInt(req.params.roll);
    });
    res.status(200).send(MyStudent);
});

router.get('/api/student/result/:pass', (req, res) => {
    const MyStudents = data.student.filter((e) => {
        return e.pass == Boolean(req.params.pass);
    });

    res.status(200).send(MyStudents);
});

router.get('/api/teacher/all', (req, res) => {
    res.status(200).send(data.teacher);
});

router.get('/api/teacher/name/:name', (req, res) => {
    const myTeacher = data.teacher.filter((e) => {
        return e.name == req.params.name;
    });

    res.status(200).send(myTeacher);
});

router.get('/api/teacher/id/:id', (req, res) => {
    const myTeacher = data.teacher.filter((e) => {
        return e.id == parseInt(req.params.id);
    });
    res.status(200).send(myTeacher[0]);
});

router.get('/api/teacher/subject/:subject', (req,res) => {
    const myTeacher = data.teacher.filter( (e) => {
        return e.subject == req.params.subject;
    });

    res.status(200).send(myTeacher);
});

module.exports = router;