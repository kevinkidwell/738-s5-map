import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import customStyles from "./styles/custom.css";


export const meta: MetaFunction = () => {
  return {
    title: "Alliance Manager",
    description: "Manage alliances and snapshots",
  };
};

export const links: LinksFunction = () => ([
  { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" },
  { rel: "stylesheet", href: customStyles },
]);

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-light">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" />
      </body>
    </html>
  );
}
