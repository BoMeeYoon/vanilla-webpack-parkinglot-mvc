const log = console.log;

export function authorize() {
    const _id = Object.keys(localStorage);
    return _id.length > 0 ? "goin" : "login"
};