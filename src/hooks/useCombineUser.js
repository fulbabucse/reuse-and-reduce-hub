import { useEffect } from "react";
import { useState } from "react";

export const useCombineUser = (email) => {
  const [isCombineUser, setIsCombineUser] = useState(true);
  const [isCombineUserLoading, setIsCombineUserLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/users/${email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("reuseReduceToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsCombineUser(data.isCombineUser);
          setIsCombineUserLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [email]);
  return [isCombineUser, isCombineUserLoading];
};
