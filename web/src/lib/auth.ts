
export function getToken() {
  return localStorage.getItem("token");
}

export function isAuthed() {
  return !!getToken();
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  // Clear axios default headers
  import("@/lib/api").then(({ setAuth }) => {
    setAuth(null);
  });
}
