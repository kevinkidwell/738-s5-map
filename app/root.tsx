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

import customStyles from "./styles/custom.css";

export const meta: MetaFunction = () => {
  return {
    title: "Alliance Manager",
    description: "Manage alliances, maps, and snapshots",
  };
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: customStyles },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <nav className="nav nav-tabs mb-3">
          <NavLink to="/map" end className="nav-link">
            Map
          </NavLink>
          <NavLink to="/alliances" className="nav-link">
            Alliances
          </NavLink>
          <NavLink to="/snapshots" className="nav-link">
            Snapshots
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
