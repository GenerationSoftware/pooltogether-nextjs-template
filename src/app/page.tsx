'use client'

import { useEffect, useState } from 'react'
import { GrandPrize } from '@components/GrandPrize'
import { Vault } from '@components/Vault'
import { VAULT_LIST } from '@constants/config'

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])

  return (
    <>
      <GrandPrize className='my-12' />
      <div className='flex gap-8 flex-wrap'>
        {isMounted &&
          VAULT_LIST.tokens.map((vault) => (
            <Vault key={`${vault.chainId}-${vault.address}`} {...vault} />
          ))}
      </div>
    </>
  )
}
