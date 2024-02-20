import { PRIZE_POOL_INFO } from '@/constants/config'
import { useVault } from '@generationsoftware/hyperstructure-react-hooks'
import classNames from 'classnames'
import { Address } from 'viem'

interface VaultProps {
  address: Address
  className?: string
}

export const Vault = (props: VaultProps) => {
  const { address, className } = props

  const vault = useVault({ chainId: PRIZE_POOL_INFO.chainId, address })

  return (
    <span className={classNames('', className)}>
      {vault.chainId}-{vault.address}
    </span>
  )
}
