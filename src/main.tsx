import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SkillProvider } from "./context/TextBattleContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  // <HeroProvider>
  <SkillProvider>
    <App />
  </SkillProvider>
  // </HeroProvider>
  // </React.StrictMode>
);
