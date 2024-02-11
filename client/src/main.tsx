import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/home";
import "./index.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <React.StrictMode>
      <Home />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
