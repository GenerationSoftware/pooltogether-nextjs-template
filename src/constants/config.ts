import { NETWORK, PRIZE_POOLS } from '@generationsoftware/hyperstructure-client-js'
import { Address } from 'viem'
import { createConfig, http } from 'wagmi'
import { mainnet, optimism } from 'wagmi/chains'

export const PRIZE_POOL_INFO = PRIZE_POOLS.find(
  (entry) => entry.chainId === NETWORK.optimism
) as NonNullable<(typeof PRIZE_POOLS)[number]>

// TODO: use vault list format
export const VAULT_ADDRESSES = [
  '0xf0b19f02c63d51b69563a2b675e0160e1c34397c',
  '0xe3b3a464ee575e8e25d2508918383b89c832f275'
] as const satisfies Lowercase<Address>[]

// TODO: use RainbowKit's `getDefaultConfig` instead to edit wallet list + add walletconnect project ID
export const WAGMI_CONFIG = createConfig({
  chains: [mainnet, optimism],
  transports: {
    [NETWORK.mainnet]: http(),
    [NETWORK.optimism]: http()
  }
})
