'use client'

import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { Navbar } from '@components/Navbar'
import { WAGMI_CONFIG } from '@constants/config'
import { getRainbowKitTheme } from '@utils/getRainbowKitTheme'
import './globals.css'

const queryClient = new QueryClient()

export default function App({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <WagmiProvider config={WAGMI_CONFIG} reconnectOnMount={true}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={getRainbowKitTheme()} coolMode={true}>
          <div className='min-w-[100vw]'>
            <Navbar className='z-50' />
            <main className='w-full flex flex-col gap-4 items-center px-4 py-8'>{children}</main>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
