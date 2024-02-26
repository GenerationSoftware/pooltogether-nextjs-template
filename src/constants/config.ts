import { NETWORK, PRIZE_POOLS, VaultList } from '@generationsoftware/hyperstructure-client-js'
import { createConfig, http } from 'wagmi'
import { mainnet, optimism } from 'wagmi/chains'

export const PRIZE_POOL_INFO = PRIZE_POOLS.find(
  (entry) => entry.chainId === NETWORK.optimism
) as NonNullable<(typeof PRIZE_POOLS)[number]>

export const VAULT_LIST = {
  name: 'PoolTogether Template App Vault List',
  version: { major: 0, minor: 1, patch: 0 },
  timestamp: '2024-02-21T00:32:35Z',
  tokens: [
    {
      chainId: NETWORK.optimism,
      address: '0xf0b19f02c63d51b69563a2b675e0160e1c34397c',
      name: 'Prize WETH',
      logoURI: 'pWETH.svg'
    },
    {
      chainId: NETWORK.optimism,
      address: '0xe3b3a464ee575e8e25d2508918383b89c832f275',
      name: 'Prize USDC.e',
      logoURI: 'pUSDC.svg'
    }
  ]
} as const satisfies VaultList

/**
 * @dev to edit the wallet list or add a walletconnect project ID, use RainbowKit's `getDefaultConfig` instead of `createConfig`
 */
export const WAGMI_CONFIG = createConfig({
  chains: [mainnet, optimism],
  transports: {
    [NETWORK.mainnet]: http(),
    [NETWORK.optimism]: http()
  }
})
