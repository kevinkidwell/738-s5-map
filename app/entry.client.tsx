import { RemixBrowser } from "@remix-run/react";
import { hydrateRoot } from "react-dom/client";

// Import Bootstrap JS so its components (Modal, Toast, etc.) are available
import "bootstrap/dist/js/bootstrap.bundle.min.js";

hydrateRoot(document, <RemixBrowser />);
