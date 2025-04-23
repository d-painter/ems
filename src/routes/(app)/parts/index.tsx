import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/parts/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/parts/"!</div>
}
