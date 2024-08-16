import API from "../API/API"
const api = new API();
const endPoints = "addstudent";

export const saveStudentData = async (newEmployee) => {

    return new Promise(async (resolve, reject) => {
        try {
          console.log("this is post call in API---->");
          const response = await api.post(`${endPoints}`,newEmployee);

          console.log("post response", response);
          if (response && response.data) {
           
            resolve(response);
            console.log("response",response)
            return(response)
          } else {
            resolve([]); 
          }
        } catch (error) {
          console.error("Error in addEmployeeData:", error); 
          reject(error);
        }
      });
    };