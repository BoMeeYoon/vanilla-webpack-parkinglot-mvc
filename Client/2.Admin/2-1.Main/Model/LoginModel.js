export function login(id, pw) {
    localStorage.setItem(id, pw);
    console.log(id, pw)
    return this;
}

export function logout() {
    const _id = Object.keys(localStorage);
    localStorage.removeItem(_id);
    return this;
}