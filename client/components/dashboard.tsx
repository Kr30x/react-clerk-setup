"use client"

import { Sidebar } from "./sidemenu"
import { Header } from "./header"
import { Feed } from "./dashboard_feed"

export function Dashboard() {
  return (
    <div className="flex min-h-screen w-full bg-background py-4">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-4 sm:p-6">
          <Feed />
        </main>
      </div>
    </div>
  )
}