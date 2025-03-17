import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/about")({
 component: AboutLayoutComponent,
});

function AboutLayoutComponent() {
  return <div>Hello, you're on the page</div>;
}
