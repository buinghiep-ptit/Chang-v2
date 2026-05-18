import { useState } from 'react'
import { Outlet } from '@tanstack/react-router'
import { BottomNav } from './bottom-nav'
import { SidebarNav } from './sidebar-nav'
import { MobileDrawer } from './mobile-drawer'

export function AppLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="flex h-dvh overflow-hidden bg-background text-foreground">
      <aside className="hidden md:flex md:w-[255px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar overflow-hidden">
        <SidebarNav />
      </aside>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-hidden flex flex-col">
          <DrawerContext.Provider value={{ openDrawer: () => setDrawerOpen(true) }}>
            <Outlet />
          </DrawerContext.Provider>
        </main>
        <BottomNav />
      </div>
    </div>
  )
}

import { createContext, useContext } from 'react'

interface DrawerCtx {
  openDrawer: () => void
}
const DrawerContext = createContext<DrawerCtx>({ openDrawer: () => {} })

export function useDrawer() {
  return useContext(DrawerContext)
}
