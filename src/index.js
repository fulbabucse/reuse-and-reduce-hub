import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "flowbite";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./Contexts/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <AuthProvider>
      <App />
      <Toaster />
    </AuthProvider>
  </>
);

reportWebVitals();
