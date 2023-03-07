import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import clayful from "clayful/client-js";
import axios from "axios";
import "./css/auth.css";

// api key
clayful.config({
  client:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjBiNDdjNzYwYWE3Y2FkMjQ5NTg3YjE3NWI0ZWFkNDNhZDQ2M2QxZWZkYTA4M2EyOWI2YmEyOWNiMWVlOGQ0ZjgiLCJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNjc4MTk4MDYxLCJzdG9yZSI6IkI1UzdBTDhNWko0QS5BNERGMkVCVDRUVUMiLCJzdWIiOiI2U1k0TExQNEE3VlAifQ.kUJxK9coIiLOEp47zdWaz-GXWUec_y434_E0vPdgNVg",
});

clayful.install("request", require("clayful/plugins/request-axios")(axios));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
