import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const meta: MetaFunction = () => ([
  { title: "Alliance Manager" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
]);

export const links: LinksFunction = () => ([
  { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" },
  { rel: "stylesheet", href: "/styles/custom.css" },
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
