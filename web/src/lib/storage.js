export function saveUser(user) {
    if (!user)
        localStorage.removeItem("user");
    else
        localStorage.setItem("user", JSON.stringify(user));
}
export function getUser() {
    const s = localStorage.getItem("user");
    return s ? JSON.parse(s) : null;
}
