import { useEffect } from "react";
import { useState } from "react";

export const useToken = (email) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (email) {
      fetch(`https://reuse-and-reduce-server.vercel.app/jwt?email=${email}`)
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
