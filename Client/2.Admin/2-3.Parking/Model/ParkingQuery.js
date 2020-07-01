import Ajax from "../../../1.Common/Model/Ajax.js";
const log = console.log;

export async function addRequest(carNumber) {
    const response = await Ajax.request("POST", `http://localhost:5000/parking`, carNumber)
    log(response);
    return response
    
}

export async function searchRequest({carNumber}) {
    const response = await Ajax.request("GET", `http://localhost:5000/parking/?${carNumber}`, null)
    log(response);
    return response
}

export async function updateRequest(userId) {
    const response = await Ajax.request("PUT", `http://localhost:5000/parking`, userId);
    log(response);
    return response
}