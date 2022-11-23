import { useEffect } from "react";
import { useState } from "react";

export const useToken = (email) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/jwt?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("reuseReduceToken", data.reuseReduceToken);
          setToken(data.reuseReduceToken);
        })
        .catch((err) => console.error(err));
    }
  }, [email]);
  return [token];
};
