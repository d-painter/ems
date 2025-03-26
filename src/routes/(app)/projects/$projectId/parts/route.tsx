import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/projects/$projectId/parts')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/projects/$projectId/parts"!</div>
}
