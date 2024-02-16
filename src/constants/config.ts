import { NETWORK, PRIZE_POOLS } from '@generationsoftware/hyperstructure-client-js'
import { createConfig, http } from 'wagmi'
import { mainnet, optimism } from 'wagmi/chains'

export const PRIZE_POOL_INFO = PRIZE_POOLS.find(
  (entry) => entry.chainId === NETWORK.optimism
) as NonNullable<(typeof PRIZE_POOLS)[number]>

export const WAGMI_CONFIG = createConfig({
  chains: [mainnet, optimism],
  transports: {
    [NETWORK.mainnet]: http(),
    [NETWORK.optimism]: http()
  }
})
