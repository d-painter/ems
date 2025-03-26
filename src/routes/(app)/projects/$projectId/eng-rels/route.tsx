import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/projects/$projectId/eng-rels')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/projects/$projectId/eng-rels"!</div>
}
