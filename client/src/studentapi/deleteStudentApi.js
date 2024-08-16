import API from "../API/API";
const api = new API();
const endPoints = "delete";

export const deleteEmployeedata = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
          console.log("this is delete call in API---->");
          const response = await api.delete(`${endPoints}/${id}`);

          console.log("delete response", response);
          if (response && response.data) {
           
            resolve(response);
            console.log("delete response",response)
            return(response)
          } else {
            resolve([]); 
          }
        } catch (error) {
          console.error("Error in deleteEmployeeData:", error); 
          reject(error);
        }
      });
    };