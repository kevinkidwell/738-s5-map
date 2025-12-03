// app/root.tsx
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import bootstrapCss from "bootstrap/dist/css/bootstrap.min.css";
import customCss from "./styles/custom.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export const meta: MetaFunction = () => ({
  title: "Alliance Manager",
  description: "Manage alliances, maps, calculations, and dates",
});

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: bootstrapCss },
  { rel: "stylesheet", href: customCss },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {/* Global layout wrapper */}
        <div className="d-flex">
          {/* Sidebar */}
          <nav className="bg-light border-end vh-100 p-3" style={{ width: "240px" }}>
            <h2 className="h5 mb-4">Alliance Manager</h2>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a className="nav-link fw-semibold" href="/map">Map</a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link fw-semibold" href="/alliances">Alliances</a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link fw-semibold" href="/calculations">Calculations</a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link fw-semibold" href="/dates">Dates</a>
              </li>
            </ul>
          </nav>

          {/* Main content */}
          <main className="flex-grow-1 p-4 bg-white">
            <Outlet />
          </main>
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
