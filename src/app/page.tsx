'use client'

import { GrandPrize } from '@components/GrandPrize'
import { Vault } from '@components/Vault'
import { VAULT_LIST } from '@constants/config'

export default function Home() {
  return (
    <>
      <GrandPrize />
      {VAULT_LIST.tokens.map((vault) => (
        <Vault key={`${vault.chainId}-${vault.address}`} {...vault} />
      ))}
    </>
  )
}
