import { RootRoute } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'

export const Route = new RootRoute({
  component: () => <Outlet />,
})
