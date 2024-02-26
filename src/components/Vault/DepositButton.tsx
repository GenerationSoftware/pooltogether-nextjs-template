import { Vault } from '@generationsoftware/hyperstructure-client-js'
import {
  useSendApproveTransaction,
  useSendDepositTransaction,
  useTokenAllowance,
  useUserVaultTokenBalance,
  useVaultBalance
} from '@generationsoftware/hyperstructure-react-hooks'
import classNames from 'classnames'
import { Address } from 'viem'
import { useAccount } from 'wagmi'

interface VaultDepositButtonProps {
  vault: Vault
  className?: string
}

export const VaultDepositButton = (
  props: VaultDepositButtonProps & {
    depositAmount: bigint
    disabled?: boolean
    onSuccess?: () => void
  }
) => {
  const { vault, depositAmount, disabled, onSuccess, className } = props

  const { address: userAddress } = useAccount()

  const { data: token, refetch: refetchVaultBalance } = useVaultBalance(vault)
  const { refetch: refetchUserVaultBalance } = useUserVaultTokenBalance(
    vault,
    userAddress as Address
  )

  const { data: allowance, refetch: refetchAllowance } = useTokenAllowance(
    vault.chainId,
    userAddress as Address,
    vault.address,
    token?.address as Address
  )

  const { sendApproveTransaction } = useSendApproveTransaction(depositAmount, vault, {
    onSuccess: () => {
      refetchAllowance()
    }
  })

  const { sendDepositTransaction } = useSendDepositTransaction(depositAmount, vault, {
    onSuccess: () => {
      refetchVaultBalance()
      refetchUserVaultBalance()
      onSuccess?.()
    }
  })

  const buttonClassName =
    'px-2 py-0.5 bg-pt-teal-dark text-pt-purple-900 rounded select-none disabled:opacity-50 disabled:pointer-events-none'

  if (!depositAmount || !userAddress || !token || allowance === undefined) {
    return (
      <button className={classNames(buttonClassName, className)} disabled={true}>
        Deposit
      </button>
    )
  }

  if (allowance < depositAmount) {
    return (
      <button
        type='submit'
        onClick={sendApproveTransaction}
        disabled={!sendApproveTransaction || disabled}
        className={classNames(buttonClassName, className)}
      >
        Approve
      </button>
    )
  }

  return (
    <button
      type='submit'
      onClick={sendDepositTransaction}
      disabled={!sendDepositTransaction || disabled}
      className={classNames(buttonClassName, className)}
    >
      Deposit
    </button>
  )
}
