import { Navbar } from '@/components/Navbar'
import { getUserAuth } from '@/lib/auth/utils'
import { Inter } from 'next/font/google';
import { redirect } from 'next/navigation'
import React from 'react'

const inter = Inter({ subsets: ["latin-ext"] });

export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {
  const { session } = await getUserAuth()

  if (!session || !session.user) {
    redirect('/api/auth/signin')
  }

  return (
    <html>
      <body className={inter.className}>
        <div className='flex h-screen'>
          <main className="flex-1 overflow-y-auto">
            <Navbar session={session} />
            <div className="overflow-y-auto p-8 pt-2 md:p-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
