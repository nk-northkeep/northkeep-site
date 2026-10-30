import { createRoot } from "react-dom/client";
import App from "./App";
import { readCookieConsent } from "./lib/consent";
import { installConsentDefaults, loadOptionalTracking } from "./lib/tracking";
import "./index.css";

installConsentDefaults();
const savedConsent = readCookieConsent();
if (savedConsent) loadOptionalTracking(savedConsent);

createRoot(document.getElementById("root")!).render(<App />);
