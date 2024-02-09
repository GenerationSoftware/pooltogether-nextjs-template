import { Navbar } from '@/components/Navbar'
import classNames from 'classnames'
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
      <body
        className={classNames(
          'w-full flex flex-col items-center bg-pt-bg-purple-darker text-pt-purple-50',
          inter.className
        )}
      >
        <Navbar className='z-50' />
        <main className='w-full flex flex-col gap-4 items-center px-4 py-8'>{children}</main>
      </body>
    </html>
  )
}
