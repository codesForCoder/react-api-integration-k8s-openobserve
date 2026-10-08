import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { openobserveRum } from "@openobserve/browser-rum";
import { openobserveLogs } from "@openobserve/browser-logs";

const options = {
  clientToken: "rumNnpbctqHHHPFsmpK",
  applicationId: "web-application-id-react", // any string identifying your application
  site: "localhost:5080",
  organizationIdentifier: "default",
  service: "my-web-application-react",
  env: "production",
  version: "0.0.2",
  insecureHTTP: true,
  apiVersion: "v1",
};

openobserveRum.init({
  applicationId: options.applicationId,
  clientToken: options.clientToken,
  site: options.site,
  organizationIdentifier: options.organizationIdentifier,
  service: options.service,
  env: options.env,
  version: options.version,
  trackResources: true,
  trackLongTasks: true,
  trackUserInteractions: true,
  apiVersion: options.apiVersion,
  insecureHTTP: options.insecureHTTP,
  defaultPrivacyLevel: "allow", // 'allow' | 'mask-user-input' | 'mask'
  // End-to-end trace correlation: inject tracing headers into matched requests.
  allowedTracingUrls: [
    {
      match: /\/api\//,
      propagatorTypes: ["openobserve", "tracecontext"],
    },
  ],
  sessionSampleRate: 100, // track 100% of sessions
  sessionReplaySampleRate: 100, // record 100% of sessions,
});

openobserveLogs.init({
  clientToken: options.clientToken,
  site: options.site,
  organizationIdentifier: options.organizationIdentifier,
  service: options.service,
  env: options.env,
  version: options.version,
  forwardErrorsToLogs: true,
  insecureHTTP: options.insecureHTTP,
  apiVersion: options.apiVersion,
});

// Optionally identify the user for session search
openobserveRum.setUser({
  id: "1",
  name: "Captain Hook",
  email: "captainhook@example.com",
});

openobserveRum.startSessionReplayRecording();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
