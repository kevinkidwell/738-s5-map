// app/root.tsx
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  NavLink,
} from "@remix-run/react";

import bootstrapCss from "bootstrap/dist/css/bootstrap.min.css";
import customCss from "./styles/custom.css";

export const meta: MetaFunction = () => ({
  title: "Alliance Manager",
  description: "Manage alliances, maps, and snapshots",
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
        <nav className="nav nav-tabs mb-3 px-3">
          <NavLink
            to="/map"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Map
          </NavLink>
          <NavLink
            to="/alliances"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Alliances
          </NavLink>
          <NavLink
            to="/public/map"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Public Map
          </NavLink>
          <NavLink
            to="/public/alliances"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Public Alliances
          </NavLink>
        </nav>

        <main className="container-fluid">
          <Outlet />
        </main>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
