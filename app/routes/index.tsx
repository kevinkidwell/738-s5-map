import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  return json({ message: "Alliance Manager is live!" });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return <h1>{data.message}</h1>;
}
