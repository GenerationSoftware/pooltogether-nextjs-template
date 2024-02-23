import { formatTokenAmount } from '@/utils/formatting'
import { VaultInfo, Vault as VaultType } from '@generationsoftware/hyperstructure-client-js'
import {
  useUserVaultTokenBalance,
  useVault,
  useVaultBalance,
  useVaultShareData
} from '@generationsoftware/hyperstructure-react-hooks'
import classNames from 'classnames'
import Image from 'next/image'
import { Address } from 'viem'
import { useAccount } from 'wagmi'
import { Loading } from './Loading'

interface VaultProps extends VaultInfo {
  className?: string
}

export const Vault = (props: VaultProps) => {
  const { className, ...rest } = props

  const vault = useVault({ ...rest })

  return (
    <span className={classNames('flex flex-col gap-4', className)}>
      <VaultHeader vault={vault} />
      <VaultUserBalance vault={vault} />
      <VaultBalance vault={vault} />
      {/* TODO: deposit and withdraw forms/buttons when applicable */}
    </span>
  )
}

interface BasicProps {
  vault: VaultType
  className?: string
}

const VaultHeader = (props: BasicProps) => {
  const { vault, className } = props

  const { data: shareToken } = useVaultShareData(vault)

  const vaultName = vault.name ?? shareToken?.name

  return (
    <div className={classNames('flex gap-2 items-center', className)}>
      <VaultLogo vault={vault} className='w-12' />
      <span className='font-medium text-xl'>{vaultName ?? <Loading className='h-3' />}</span>
    </div>
  )
}

const VaultLogo = (props: BasicProps) => {
  const { vault, className } = props

  return (
    <Image
      src={vault.logoURI ?? ''}
      alt={`${vault.name} Logo`}
      width={24}
      height={24}
      className={className}
    />
  )
}

const VaultUserBalance = (props: BasicProps) => {
  const { vault, className } = props

  const { address: userAddress } = useAccount()

  const { data: token } = useUserVaultTokenBalance(vault, userAddress as Address)

  if (!userAddress) {
    return <></>
  }

  const userBalance = !!token ? formatTokenAmount(token.amount, token.decimals) : undefined

  return (
    <span className={classNames('flex gap-1 items-center', className)}>
      <span className='text-pt-purple-100'>Your Balance:</span>
      {!!token ? (
        <span>
          {userBalance} {token.symbol}
        </span>
      ) : (
        <Loading className='h-2' />
      )}
    </span>
  )
}

const VaultBalance = (props: BasicProps) => {
  const { vault, className } = props

  const { data: token } = useVaultBalance(vault)

  const balance = !!token ? formatTokenAmount(token.amount, token.decimals) : undefined

  return (
    <span className={classNames('flex gap-1 items-center', className)}>
      <span className='text-pt-purple-100'>Total Vault Assets:</span>
      {!!token ? (
        <span>
          {balance} {token.symbol}
        </span>
      ) : (
        <Loading className='h-2' />
      )}
    </span>
  )
}
