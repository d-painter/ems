import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(app)/projects/$projectId/eng-rels/$engRel',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/projects/$projectId/eng-rels/$engRel"! PARAMS</div>
}
