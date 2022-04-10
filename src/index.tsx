import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";

const uri = "https://auth0-todo-delta.vercel.app/todo";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-txd32pvw.us.auth0.com"
      clientId="55m01tcn16eMpSCwNuUQx7emMDoA7Yom"
      redirectUri={uri}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
