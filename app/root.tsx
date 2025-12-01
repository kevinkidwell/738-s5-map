import { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  LiveReload,
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
        {/* Firebase v8 CDN */}
        <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js" />
        <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js" />
        <script
  dangerouslySetInnerHTML={{
    __html: `
      window.firebaseConfig = {
        apiKey: "${process.env.FIREBASE_API_KEY}",
        authDomain: "${process.env.FIREBASE_AUTH_DOMAIN}",
        projectId: "${process.env.FIREBASE_PROJECT_ID}",
        storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET}",
        messagingSenderId: "${process.env.FIREBASE_SENDER_ID}",
        appId: "${process.env.FIREBASE_APP_ID}"
      };
      if (!window.firebase?.apps?.length) {
        window.firebase.initializeApp(window.firebaseConfig);
      }
    `,
  }}
/>

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
