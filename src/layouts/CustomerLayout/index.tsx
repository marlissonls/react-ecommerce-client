import { Outlet } from 'react-router'

import Header from '@/components/Header'

import CustomerSidebar from '@/pages/Customer/components/CustomerSidebar'

export default function CustomerLayout() {
  return (
    <div className="min-h-screen bg-[#FCFCFA]">
      <Header variant="panel" />

      <div className="flex min-h-[calc(100vh-133px)] pt-[133px] max-[640px]:min-h-[calc(100vh-123px)] max-[640px]:pt-[123px]">
        <CustomerSidebar onClose={() => {}} />

        <main className="min-w-0 flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}