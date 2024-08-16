const studentModule = require('../model/studentModel')

const createStudent = async(req,res) => {
    try {
        const { name, branch, gpa , location } = req.body
        const student = new studentModule({
            name, branch, gpa,location
        })
        await student.save()//saves data in db
        res.status(201).json(student)
    } catch (error) {
        console.log("error", error);
        res.status(400).json({ message: "bad request" })  
    }
}
const getStudent = async (req, res) => {
    try {
        const students = await studentModule.find()
        res.status(200).json(students)
    }
    catch (error) {
        console.log("error", error)
    }
}

const updateStudent = async (req, res) => {
    try {
        const { name, branch, gpa ,location } = req.body //mongoose method findByIdAndUpdate()
        const updstudent = await studentModule.findByIdAndUpdate(
            req.params.id,
            { name, branch,gpa, location }, {new: true,runValidators:true}
            // { new: true } 
        )
        // console.log("req.params.id",req.params.id);
        console.log("updstudent",updstudent);
        
        
        if (!updstudent) {
            return res.status(400).json({ message: "student not found" })
        }
        res.status(201).json(updstudent)
    }
    catch (error) {
        console.log("error", error)
        res.status(500).json({ message: "server error" })
    }
}
const deleteStudent = async (req ,res) => {
    try{
    const deletedStudent = await studentModule.findByIdAndDelete(req.params.id)
    res.status(201).json({msg:"student document is deleted successfully"})
    }
    catch(error){
   console.log("error",error)
   res.status(500).json({ message: "server error" })
    } 
 }
 module.exports = { createStudent, getStudent, updateStudent ,deleteStudent}