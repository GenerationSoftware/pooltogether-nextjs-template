import { VaultInfo, Vault as VaultType } from '@generationsoftware/hyperstructure-client-js'
import { useVault } from '@generationsoftware/hyperstructure-react-hooks'
import classNames from 'classnames'
import Image from 'next/image'

interface VaultProps extends VaultInfo {
  className?: string
}

export const Vault = (props: VaultProps) => {
  const { className, ...rest } = props

  const vault = useVault({ ...rest })

  return (
    <span className={classNames('flex flex-col gap-4 items-center', className)}>
      <VaultHeader vault={vault} />
      {/* TODO: user balance in vault, if wallet connected */}
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

  return (
    <div className={classNames('flex gap-2 items-center', className)}>
      <VaultLogo vault={vault} className='w-12' />
      {/* TODO: vault name */}
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
