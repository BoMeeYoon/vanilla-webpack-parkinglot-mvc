
export function verifyCarNumber(data) {
    const pattern = `^[0-9]{4}$` 
    const check = new RegExp(pattern)
    const _check = check.test(data.carNumber)

    return _check === true ? 1 : -2 
}

export function verifyUserType(data, type="user") {
    
    switch (type) {

        case 'member' : return data.filter( info => info.memberId !== 1)
        
        case 'user' : return data.filter( info => info.memberId === 1)
    }
}