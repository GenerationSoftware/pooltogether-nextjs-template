import { Vault } from '@generationsoftware/hyperstructure-client-js'
import {
  useSendWithdrawTransaction,
  useUserVaultTokenBalance,
  useVaultBalance
} from '@generationsoftware/hyperstructure-react-hooks'
import classNames from 'classnames'
import { Address } from 'viem'
import { useAccount } from 'wagmi'

interface VaultWithdrawButtonProps {
  vault: Vault
  className?: string
}

export const VaultWithdrawButton = (
  props: VaultWithdrawButtonProps & {
    withdrawAmount: bigint
    disabled?: boolean
    onSuccess?: () => void
  }
) => {
  const { vault, withdrawAmount, disabled, onSuccess, className } = props

  const { address: userAddress } = useAccount()

  const { data: token, refetch: refetchVaultBalance } = useVaultBalance(vault)
  const { refetch: refetchUserVaultBalance } = useUserVaultTokenBalance(
    vault,
    userAddress as Address
  )

  const { sendWithdrawTransaction } = useSendWithdrawTransaction(withdrawAmount, vault, {
    onSuccess: () => {
      refetchVaultBalance()
      refetchUserVaultBalance()
      onSuccess?.()
    }
  })

  const buttonClassName =
    'px-2 py-0.5 bg-pt-teal-dark text-pt-purple-900 rounded select-none disabled:opacity-50 disabled:pointer-events-none'

  if (!withdrawAmount || !userAddress || !token) {
    return (
      <button className={classNames(buttonClassName, className)} disabled={true}>
        Withdraw
      </button>
    )
  }

  return (
    <button
      type='submit'
      onClick={sendWithdrawTransaction}
      disabled={!sendWithdrawTransaction || disabled}
      className={classNames(buttonClassName, className)}
    >
      Withdraw
    </button>
  )
}
