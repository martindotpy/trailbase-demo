import { Toaster } from "@/core/components/ui/sonner"
import { TanStackDevtools } from "@tanstack/react-devtools"
import { Outlet, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"

// Route
export const Route = createRootRoute({
  component: RootLayout,
})

// Component
function RootLayout() {
  return (
    <>
      <Outlet />

      <Toaster />

      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  )
}
