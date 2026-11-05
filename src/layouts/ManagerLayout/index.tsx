import { Outlet } from 'react-router'

import PanelHeader from '@/components/PanelHeader'
import PanelSidebar from '@/components/PanelSidebar'

export default function ManagerLayout() {
  return (
    <div className="min-h-screen bg-[#FCFCFA]">
      <PanelHeader title="Gestão do negócio" />

      <div className="flex min-h-[calc(100vh-64px)] pt-16">
        <PanelSidebar
          variant="manager"
          onClose={() => {}}
        />

        <main className="min-w-0 flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}