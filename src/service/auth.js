// import Cookies from "js-cookie";

// export const getRole = () => Cookies.get("role");

// export const hasRole = (...roles) => {
//   return roles.includes(getRole());
// };
import Cookies from "js-cookie";

export const getRole = () => Cookies.get("role");
export const getEmail = () => Cookies.get("email");
export const isAuthenticated = () => !!Cookies.get("role");
