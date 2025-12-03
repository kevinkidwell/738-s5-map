// app/utils/entry.client.tsx
import { RemixBrowser } from "@remix-run/react";
import { hydrateRoot } from "react-dom/client";

// Load Bootstrap JS bundle (includes Popper)
import "bootstrap/dist/js/bootstrap.bundle.min.js";

hydrateRoot(document, <RemixBrowser />);
