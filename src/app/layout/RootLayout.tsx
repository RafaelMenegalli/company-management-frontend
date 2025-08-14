import { Outlet, useLocation, Link } from "react-router-dom"
import { ThemeProvider } from "@/app/providers/theme-provider"
import { AppSidebar } from "@/components/common/app-sidebar"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/common/mode-toggle"
import { breadcrumbMap } from "@/utils/breadcrumbs"

type Props = { hideChrome?: boolean }

export function RootLayout({ hideChrome }: Props) {
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter((x) => x)

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      {hideChrome ? (
        <main className="container mx-auto p-4">
          <Outlet />
        </main>
      ) : (
        <SidebarProvider>
          <AppSidebar />

          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2">
              <div className="flex items-center justify-between w-full p-4">
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />

                  {/* Breadcrumbs dinâmicos */}
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link to="/">Home</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>

                      {pathnames.map((segment, index) => {
                        const to = `/${pathnames.slice(0, index + 1).join("/")}`
                        const isLast = index === pathnames.length - 1
                        const label = breadcrumbMap[to] || segment

                        return (
                          <div key={to} className="flex items-center">
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                              {isLast ? (
                                <BreadcrumbPage>{label}</BreadcrumbPage>
                              ) : (
                                <BreadcrumbLink asChild>
                                  <Link to={to}>{label}</Link>
                                </BreadcrumbLink>
                              )}
                            </BreadcrumbItem>
                          </div>
                        )
                      })}
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>

                <ModeToggle />
              </div>
            </header>

            <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <Outlet />
            </main>
          </SidebarInset>
        </SidebarProvider>
      )}
    </ThemeProvider>
  )
}
