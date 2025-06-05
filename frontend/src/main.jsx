import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

import { ToastContainer, toast } from "react-toastify";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
        <ToastContainer />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
