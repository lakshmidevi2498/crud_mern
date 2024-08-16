import API from "../API/API";
const api = new API();
const endPoints = "update";

export const updateEmployeeDataChanges = async (employeedata, id) => {

    return new Promise(async (resolve, reject) => {
        try {
          console.log("this is put call in API---->");
          const response = await api.put(`${endPoints}/${id}`,employeedata);

          console.log(" put response", response);
          if (response && response.data) {
           
            resolve(response);
            console.log("put response",response)
            return(response)
          } else {
            resolve([]); 
          }
        } catch (error) {
          console.error("Error in updateEmployeeData:", error); 
          reject(error);
        }
      });
    };