import { useEffect } from "react";
import { useState } from "react";

export const useAdmin = (email) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/users/admin/${email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("reuseReduceToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsAdmin(data.isAdmin);
          setAdminLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [email]);
  return [isAdmin, adminLoading];
};
