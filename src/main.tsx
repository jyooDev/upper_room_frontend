import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { auth } from "./firebase/init-firebase.ts";

export { auth };

createRoot(document.getElementById("root")!).render(<App />);
