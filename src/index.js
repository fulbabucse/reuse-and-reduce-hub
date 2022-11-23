import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./Contexts/AuthProvider";
import "tw-elements";

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
