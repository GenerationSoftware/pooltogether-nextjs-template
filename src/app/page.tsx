'use client'

import { GrandPrize } from '@components/GrandPrize'
import { Vault } from '@components/Vault'
import { PRIZE_POOL_INFO, VAULT_ADDRESSES } from '@constants/config'

export default function Home() {
  return (
    <>
      <GrandPrize />
      {VAULT_ADDRESSES.map((vaultAddress) => (
        <Vault key={`${PRIZE_POOL_INFO.chainId}-${vaultAddress}`} address={vaultAddress} />
      ))}
    </>
  )
}
