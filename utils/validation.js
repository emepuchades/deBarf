
export function validateEmail(email) {
    const validateEmail = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

    if (!validateEmail.test(email)) {
        return false;
    } else {
        return true
    }
}