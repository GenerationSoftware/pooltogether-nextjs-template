'use client'

import { GrandPrize } from '@components/GrandPrize'
import { Vault } from '@components/Vault'
import { VAULT_LIST } from '@constants/config'

export default function Home() {
  return (
    <>
      <GrandPrize className='my-12' />
      <div className='flex gap-8 items-center flex-wrap'>
        {VAULT_LIST.tokens.map((vault) => (
          <Vault key={`${vault.chainId}-${vault.address}`} {...vault} />
        ))}
      </div>
    </>
  )
}
