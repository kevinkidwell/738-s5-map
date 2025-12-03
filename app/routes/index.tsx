import { redirect } from "@remix-run/node";

export const loader = async () => {
  return redirect("/map");
};

export default function Index() {
  return null;
}
