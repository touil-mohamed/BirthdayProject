import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "./Provider";
import "./index.css";
import serviceWorkerManager from "./service/service-worker-manager.js";

// Enregistrez le service worker
serviceWorkerManager.register();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider>
    <App />
  </Provider>
);
