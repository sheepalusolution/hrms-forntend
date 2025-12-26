import Cookies from "js-cookie";

export const login = async (credentials) => {
  // Call backend API to validate login
  const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (data.token && data.role) {
    // Save token and role in cookies
    Cookies.set("token", data.token, { expires: 1 }); // 1 day
    Cookies.set("role", data.role, { expires: 1 });
  }

  return data;
};

export const logout = () => {
  Cookies.remove("token");
  Cookies.remove("role");
};
