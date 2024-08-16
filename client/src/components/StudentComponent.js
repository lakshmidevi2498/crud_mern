import React, { useEffect, useState } from 'react';
import Imports from '../commons/Controls';
import { Paper } from '@mui/material';
import { styled } from '@mui/material';
import { fetchStudentData } from '../studentapi/getStudentApi';
import { saveStudentData } from '../studentapi/addStudentApi';
import { deleteEmployeedata } from '../studentapi/deleteStudentApi';
import { updateEmployeeDataChanges } from '../studentapi/updateStudentApi';

const StudentComponent = () => {
  const [students, setStudents] = useState([]);
  const [data, setData] = useState({
    addEmp: false,
    editData: null,
    editMode: false,
  });
  const [student, setStudent] = useState({
    name: '',
    branch: '',
    gpa: '',
    location: '',
  });
  const [errors, setErrors] = useState({
    nameError: false,
    branchError: false,
    gpaError: false,
    locationError: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const studentData = await fetchStudentData();
    setStudents(studentData);
  };

  const HeaderStyle = styled(Imports.TableCell)({
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  });

  const BodyStyle = styled(Imports.TableCell)({
    color: 'black',
    fontWeight: 'normal',
    textAlign: 'center',
  });

  const handleAdd = () => {
    setData((prevState) => ({
      ...prevState,
      addEmp: true,
      editMode: false,
      editData: null,
    }));
    setStudent({
      name: '',
      branch: '',
      gpa: '',
      location: '',
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteEmployeedata(id);
      if (response.status === 200 || response.status === 201) {
        fetchData();
      } else {
        alert('Failed to delete student. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('An error occurred while deleting the student. Please try again.');
    }
  };

  const handleEdit = (data) => {
    
    setData((prevState) => ({
      ...prevState,
      editData: data,
      editMode: true,
      addEmp: true,
    }));
    console.log("data",data)
    setStudent(prevState=>({
        ...prevState,
        _id: data._id, 

        name:data.name,
        branch:data.branch,
        gpa:data.gpa,
        location:data.location
        
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudent({ ...student, [name]: value });

    switch (name) {
      case 'name':
        validateName(value);
        break;
      case 'branch':
        validateBranch(value);
        break;
      case 'gpa':
        validateGPA(value);
        break;
      case 'location':
        validateLocation(value);
        break;
      default:
        break;
    }
  };

  const handleSave = (event) => {
    event.preventDefault();

    const isNameValid = validateName(student.name);
    const isBranchValid = validateBranch(student.branch);
    const isGpaValid = validateGPA(student.gpa);
    const isLocationValid = validateLocation(student.location);

    if (isNameValid && isBranchValid && isGpaValid && isLocationValid) {
      submitHandle();
    } 
  };

  const validateName = (name) => {
    if (!name || name.length < 3) {
      setErrors((prevErrors) => ({ ...prevErrors, nameError: true }));
      return false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, nameError: false }));
      return true;
    }
  };

  const validateBranch = (branch) => {
    if (!branch) {
      setErrors((prevErrors) => ({ ...prevErrors, branchError: true }));
      return false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, branchError: false }));
      return true;
    }
  };

  const validateGPA = (gpa) => {
    if (!gpa) {
      setErrors((prevErrors) => ({ ...prevErrors, gpaError: true }));
      return false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, gpaError: false }));
      return true;
    }
  };

  const validateLocation = (location) => {
    if (!location) {
      setErrors((prevErrors) => ({ ...prevErrors, locationError: true }));
      return false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, locationError: false }));
      return true;
    }
  };

  const submitHandle = async () => {
    const { name, branch, gpa, location } = student;
    if (!name || !branch || !gpa || !location) {
      alert('Please enter all fields');
    } else {
      const newStudent = { ...student };
       await saveStudentData(newStudent);
      fetchData();
      handleCancel();
    }
  };

  const handleCancel = () => {
    setData({
      addEmp: false,
      editData: null,
      editMode: false,
    });
    setStudent({
      name: '',
      branch: '',
      gpa: '',
      location: '',
    });
  };
  const handleSaveChanes = async () => {
    const { _id, name, branch, gpa, location } = student;
    const updatedStudent = { name, branch, gpa, location };
  console.log("student",student)
    try {
      const response = await updateEmployeeDataChanges(updatedStudent, _id);
      if (response.status === 200 || response.status === 201) {
        fetchData(); 
        handleCancel();
      } else {
        alert('Failed to update student. Please try again.');
      }
    } catch (error) {
      console.error('Error updating student:', error);
      alert('An error occurred while updating the student. Please try again.');
    }
  };
  
  return (
    <>
      <Imports.Grid container justifyContent="center" mt={5}>
        {data.addEmp && (
          <Imports.Grid item sx={{ justifyContent: 'center', display: 'flex' }} xs={12}>
            <Imports.Grid container sx={{ justifyContent: 'center', display: 'flex' }} mt={4}>
              <Imports.Grid item sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }} gap={1}>
                <Imports.Grid item sx={{dispaly :"block"}}>
                <Imports.TextField
                  required
                  id="outlined-required"
                  label="Name"
                  name="name"
                  value={student.name}
                  onChange={handleChange}
                />
                {errors.nameError && <Imports.Typography sx={{color:"red"}}>Please enter your name </Imports.Typography>}
                </Imports.Grid>
                <Imports.Grid item sx={{dispaly :"block"}}>
                <Imports.TextField
                  required
                  id="outlined-required"
                  label="Branch"
                  name="branch"
                  value={student.branch}
                  onChange={handleChange}
                />
                {errors.branchError && <Imports.Typography sx={{color:"red"}}>Please enter your branch name </Imports.Typography>}
                </Imports.Grid>
                <Imports.Grid item sx={{dispaly :"block"}}>
                <Imports.TextField
                  required
                  id="outlined-required"
                  label="GPA"
                  name="gpa"
                  value={student.gpa}
                  onChange={handleChange}
                />
                {errors.gpaError && <Imports.Typography sx={{color:"red"}}>Please enter your GPA</Imports.Typography>}
                </Imports.Grid>
                <Imports.Grid item sx={{dispaly :"block"}}>
                <Imports.TextField
                  required
                  id="outlined-required"
                  label="Location"
                  name="location"
                  value={student.location}
                  onChange={handleChange}
                />
                {errors.locationError && <Imports.Typography sx={{color:"red"}}>Please enter your location</Imports.Typography>}
                </Imports.Grid>
                <Imports.Grid item gap={2}>
                  {data.editMode ? (
                    <Imports.Button
                      variant="outlined"
                      sx={{
                        color: 'green',
                        border: '2px solid green',
                        '&:hover': { border: '2px solid green' },
                        marginX: '10px',
                      }}
                      onClick={handleSaveChanes}
                    >
                      Save Changes
                    </Imports.Button>
                  ) : (
                    <Imports.Button
                      variant="outlined"
                      sx={{
                        color: 'green',
                        border: '2px solid green',
                        '&:hover': { border: '2px solid green' },
                        marginX: '10px',
                      }}
                      onClick={handleSave}
                    >
                      Save
                    </Imports.Button>
                  )}
                  <Imports.Button
                    variant="outlined"
                    sx={{
                      color: 'red',
                      border: '2px solid red',
                      '&:hover': { border: '2px solid red' },
                    }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Imports.Button>
                </Imports.Grid>
              </Imports.Grid>
            </Imports.Grid>
          </Imports.Grid>
        )}
        <Imports.Grid item xs={8}>
          <Imports.Grid container justifyContent="space-between" display="flex" padding="20px">
            <Imports.Typography variant="h4">Manage Student Details</Imports.Typography>
            <Imports.Button
              variant="outlined"
              sx={{
                color: 'purple',
                border: '2px solid purple',
                '&:hover': { border: '2px solid purple' },
              }}
              onClick={handleAdd}
            >
              ADD+
            </Imports.Button>
          </Imports.Grid>
          <Imports.TableContainer component={Paper} sx={{ justifyContent: 'center' }}>
            <Imports.Table sx={{ minWidth: 700 }} aria-label="customized table">
              <Imports.TableHead sx={{ backgroundColor: 'purple' }}>
                <Imports.TableRow>
                  <HeaderStyle>S.no</HeaderStyle>
                  <HeaderStyle>Name</HeaderStyle>
                  <HeaderStyle>Branch</HeaderStyle>
                  <HeaderStyle>GPA</HeaderStyle>
                  <HeaderStyle>Location</HeaderStyle>
                  <HeaderStyle>Actions</HeaderStyle>
                </Imports.TableRow>
              </Imports.TableHead>
              <Imports.TableBody>
                {students &&
                  students.length > 0 &&
                  students.map((data, index) => (
                    <Imports.TableRow key={index}>
                      <BodyStyle>{index + 1}</BodyStyle>
                      <BodyStyle>{data.name}</BodyStyle>
                      <BodyStyle>{data.branch}</BodyStyle>
                      <BodyStyle>{data.gpa}</BodyStyle>
                      <BodyStyle>{data.location}</BodyStyle>
                      <BodyStyle>
                        <Imports.Button
                          variant="outlined"
                          sx={{
                            color: 'green',
                            border: '2px solid green',
                            '&:hover': { border: '2px solid green' },
                            marginX: '10px',
                          }}
                          onClick={() => handleEdit(data)}
                        >
                          <Imports.EditOutlinedIcon/>
                        </Imports.Button>
                        <Imports.Button
                          variant="outlined"
                          sx={{
                            color: 'red',
                            border: '2px solid red',
                            '&:hover': { border: '2px solid red' },
                          }}
                          onClick={() => handleDelete(data._id)}
                        >
                          <Imports.DeleteOutlineOutlinedIcon/>
                        </Imports.Button>
                      </BodyStyle>
                    </Imports.TableRow>
                  ))}
              </Imports.TableBody>
            </Imports.Table>
          </Imports.TableContainer>
        </Imports.Grid>
      </Imports.Grid>
    </>
  );
};

export default StudentComponent;
