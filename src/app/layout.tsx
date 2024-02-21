import '@rainbow-me/rainbowkit/styles.css'
import classNames from 'classnames'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import App from './app'
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
        <App>{children}</App>
      </body>
    </html>
  )
}
