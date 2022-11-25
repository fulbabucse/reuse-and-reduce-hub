import { useEffect } from "react";
import { useState } from "react";

export const useSeller = (email) => {
  const [isSeller, setIsSeller] = useState(true);
  const [sellerLoading, setSellerLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/users/seller/${email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("reuseReduceToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsSeller(data.isSeller);
          setSellerLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [email]);
  return [isSeller, sellerLoading];
};
