const express = require('express');
const router = express.Router();
const studentContoler = require('../controller/studentController')
const studentModel = require ('../model/studentModel')

router.post('/addstudent',studentContoler.createStudent)
router.get('/allstudents',studentContoler.getStudent)
router.put('/update/:id',studentContoler.updateStudent)
router.delete('/delete/:id',studentContoler.deleteStudent)
module.exports = router