import { Vault } from '@generationsoftware/hyperstructure-client-js'
import { useVaultBalance } from '@generationsoftware/hyperstructure-react-hooks'
import classNames from 'classnames'
import { Loading } from '@components/Loading'
import { formatTokenAmount } from '@utils/formatting'

interface VaultBalanceProps {
  vault: Vault
  className?: string
}

export const VaultBalance = (props: VaultBalanceProps) => {
  const { vault, className } = props

  const { data: token } = useVaultBalance(vault)

  const balance = !!token ? formatTokenAmount(token.amount, token.decimals) : undefined

  return (
    <div className={classNames('flex gap-1 items-center', className)}>
      <span className='text-pt-purple-100'>Total Vault Assets:</span>
      {!!token ? (
        <span>
          {balance} {token.symbol}
        </span>
      ) : (
        <Loading className='h-2' />
      )}
    </div>
  )
}
