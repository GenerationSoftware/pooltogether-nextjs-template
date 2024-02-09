import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PoolTogether App Template',
  description:
    'This is a minimal template for a static NextJS app that interacts with the PoolTogether protocol'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {/* TODO: navbar */}
        <main className='w-full flex flex-col gap-4 items-center'>{children}</main>
      </body>
    </html>
  )
}
