import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import AuthConfig from "../auth0-config.js";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import { store } from "./redux/configureRedux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ThemeProvider } from "@material-tailwind/react";

const initialOptions = {
  "client-id": import.meta.env.VITE_APP_CLIENT_ID,
  currency: "USD",
  intent: "capture",
  "disable-funding": "credit,card",
};

const authOptions = {
  domain: AuthConfig.domain,
  clientId: AuthConfig.clientId,
  authorizationParams: {
    redirect_uri: AuthConfig.redirectUri,
    audience: `https://${AuthConfig.domain}/api/v2/`,
  },
};

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <Auth0Provider {...authOptions}>
      <Provider store={store}>
        <PayPalScriptProvider options={initialOptions}>
          <App />
        </PayPalScriptProvider>
      </Provider>
    </Auth0Provider>
  </ThemeProvider>
);
