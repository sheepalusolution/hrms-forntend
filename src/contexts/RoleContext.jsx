import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = Cookies.get("role");
    if (storedRole) setRole(storedRole);
  }, []);

  const updateRole = (newRole) => {
    setRole(newRole);
    Cookies.set("role", newRole, { expires: 1 });
  };

  return (
    <RoleContext.Provider value={{ role, setRole: updateRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
