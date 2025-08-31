export function saveUser(user: any | null) {
  if (!user) localStorage.removeItem("user");
  else localStorage.setItem("user", JSON.stringify(user));
}
export function getUser(): any | null {
  const s = localStorage.getItem("user");
  return s ? JSON.parse(s) : null;
}
