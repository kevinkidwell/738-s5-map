import { redirect } from "@remix-run/node";

// Loader runs when someone hits "/"
export const loader = async () => {
  // Redirect straight to the map route
  return redirect("/map");
};

export default function Index() {
  // This component never actually renders,
  // because the loader redirects before it gets here.
  return null;
}
