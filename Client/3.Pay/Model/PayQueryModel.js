import Ajax from "../../1.Common/Model/Ajax.js";
const log = console.log
export async function searchRequest({carNumber}) {
    const response = await Ajax.request("GET", `http://localhost:5000/pay/out/?carNumber=${carNumber}`, null);
    
    log(response)
    debugger
}

export async function updateRequest({carNumber}) {
    const response = await Ajax.request("PUT", `http://localhost:5000/pay/out`, carNumber)
    log(response)
    debugger
}

