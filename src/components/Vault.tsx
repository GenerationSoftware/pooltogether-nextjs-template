import { VaultInfo } from '@generationsoftware/hyperstructure-client-js'
import { useVault } from '@generationsoftware/hyperstructure-react-hooks'
import classNames from 'classnames'

interface VaultProps extends VaultInfo {
  className?: string
}

export const Vault = (props: VaultProps) => {
  const { className, ...rest } = props

  const vault = useVault({ ...rest })

  return (
    <span className={classNames('', className)}>
      {vault.chainId}-{vault.address}
    </span>
  )
}
