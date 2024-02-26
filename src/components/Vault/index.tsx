import { VaultInfo } from '@generationsoftware/hyperstructure-client-js'
import { useVault } from '@generationsoftware/hyperstructure-react-hooks'
import classNames from 'classnames'
import { VaultBalance } from './Balance'
import { VaultDepositForm } from './DepositForm'
import { VaultHeader } from './Header'
import { VaultUserBalance } from './UserBalance'
import { VaultWithdrawForm } from './WithdrawForm'

interface VaultProps extends VaultInfo {
  className?: string
}

export const Vault = (props: VaultProps) => {
  const { className, ...rest } = props

  const vault = useVault({ ...rest })

  return (
    <span
      className={classNames('flex flex-col gap-4 px-4 py-6 bg-pt-purple-800 rounded-lg', className)}
    >
      <VaultHeader vault={vault} />
      <hr className='border-pt-purple-600' />
      <VaultUserBalance vault={vault} />
      <VaultBalance vault={vault} />
      <VaultDepositForm vault={vault} />
      <VaultWithdrawForm vault={vault} />
    </span>
  )
}
