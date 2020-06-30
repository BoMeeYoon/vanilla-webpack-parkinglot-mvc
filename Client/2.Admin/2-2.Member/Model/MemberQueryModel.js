import Ajax from "../../../1.Common/Model/Ajax.js";
const log = console.log;
export async function searchRequest(option, inputData) {
    const response = await Ajax.request("GET", `http://localhost:5000/member/?${option}=${inputData}`, null);
    log(response);
    
    return response.length < 1 || response.result === -1 ? -1 : response
    
}
export async function updateRequest(updateData) {
    const response = await Ajax.request("PUT", `http://localhost:5000/member`, [updateData]);
    log(response);
    
    return response !==1 ? response.result : response;
    
}

export async function addRequest(addData) {
    const response = await Ajax.request("POST", `http://localhost:5000/member`, [addData]);
    log(response);

    return response !==1 ? response.result : 1
}

export async function deleteRequest(carNumber) {
    debugger
}