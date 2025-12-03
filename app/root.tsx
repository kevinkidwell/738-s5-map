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
  title: "Season 5 Map - 738",
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
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
