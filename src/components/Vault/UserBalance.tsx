import { Vault } from '@generationsoftware/hyperstructure-client-js'
import { useUserVaultTokenBalance } from '@generationsoftware/hyperstructure-react-hooks'
import classNames from 'classnames'
import { Address } from 'viem'
import { useAccount } from 'wagmi'
import { Loading } from '@components/Loading'
import { formatTokenAmount } from '@utils/formatting'

interface VaultUserBalanceProps {
  vault: Vault
  className?: string
}

export const VaultUserBalance = (props: VaultUserBalanceProps) => {
  const { vault, className } = props

  const { address: userAddress } = useAccount()

  const { data: token } = useUserVaultTokenBalance(vault, userAddress as Address)

  if (!userAddress) {
    return <></>
  }

  const userBalance = !!token ? formatTokenAmount(token.amount, token.decimals) : undefined

  return (
    <div className={classNames('flex gap-1 items-center', className)}>
      <span className='text-pt-purple-100'>Your Balance:</span>
      {!!token ? (
        <span>
          {userBalance} {token.symbol}
        </span>
      ) : (
        <Loading className='h-2' />
      )}
    </div>
  )
}
