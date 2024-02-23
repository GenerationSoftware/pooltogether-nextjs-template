import { formatTokenAmount } from '@/utils/formatting'
import { VaultInfo, Vault as VaultType } from '@generationsoftware/hyperstructure-client-js'
import {
  useSendApproveTransaction,
  useSendDepositTransaction,
  useTokenAllowance,
  useTokenBalance,
  useUserVaultTokenBalance,
  useVault,
  useVaultBalance,
  useVaultShareData,
  useVaultTokenData
} from '@generationsoftware/hyperstructure-react-hooks'
import classNames from 'classnames'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { Address, formatUnits, parseUnits } from 'viem'
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
      <VaultDepositForm vault={vault} />
      <VaultWithdrawForm vault={vault} />
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

const VaultDepositForm = (props: BasicProps) => {
  const { vault, className } = props

  const { address: userAddress } = useAccount()

  const { data: token } = useVaultTokenData(vault)

  const { data: tokenWithAmount, isFetching: isFetchingUserBalance } = useTokenBalance(
    vault.chainId,
    userAddress as Address,
    token?.address as Address,
    { refetchOnWindowFocus: true }
  )

  const userBalance = !isFetchingUserBalance ? tokenWithAmount?.amount : undefined

  const { register, formState, setValue, watch, resetField } = useForm<{ tokenAmount: string }>({
    mode: 'onChange',
    defaultValues: { tokenAmount: '' }
  })

  const formTokenAmount = watch('tokenAmount')

  if (!token) {
    return <></>
  }

  const depositAmount =
    !!formTokenAmount && formState.isValid ? parseUnits(formTokenAmount, token.decimals) : 0n
  const errorMsg = formState.errors['tokenAmount']?.message

  // TODO: style
  return (
    <div className={classNames('flex flex-col', className)}>
      <div className='flex gap-1 items-center justify-between'>
        <span>Deposit {token.symbol}</span>
        {userBalance !== undefined ? (
          <button
            onClick={() => setValue('tokenAmount', formatTokenAmount(userBalance, token.decimals))}
            className='text-sm'
          >
            Max ({formatTokenAmount(userBalance, token.decimals)} {token.symbol})
          </button>
        ) : (
          <Loading className='h-2' />
        )}
      </div>
      <div className='flex'>
        <input
          id='tokenAmount'
          placeholder='0'
          {...register('tokenAmount', {
            validate: {
              isValidNumber: (v) => !Number.isNaN(Number(v)) || 'Enter a valid number',
              isGreaterThanOrEqualToZero: (v) =>
                parseFloat(v) >= 0 || 'Enter a valid positive number',
              isNotTooPrecise: (v) =>
                v.split('.').length < 2 ||
                v.split('.')[1].length <= token.decimals ||
                'Too many decimals',
              isNotGreaterThanBalance: (v) =>
                !userBalance ||
                parseFloat(formatUnits(userBalance, token.decimals)) >= parseFloat(v) ||
                `Not enough ${token.symbol} in wallet`
            }
          })}
          className='grow'
        />
        <VaultDepositButton
          vault={vault}
          userAddress={userAddress}
          depositAmount={depositAmount}
          onSuccess={() => resetField('tokenAmount')}
        />
      </div>
      {!!errorMsg && <span className='text-sm text-pt-warning-light'>{errorMsg}</span>}
    </div>
  )
}

const VaultDepositButton = (
  props: BasicProps & {
    userAddress?: Address
    depositAmount: bigint
    disabled?: boolean
    onSuccess?: () => void
  }
) => {
  const { vault, userAddress, depositAmount, disabled, onSuccess, className } = props

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

  // TODO: style
  const buttonClassName = ''

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

const VaultWithdrawForm = (props: BasicProps) => {
  const { vault, className } = props

  // TODO

  return <></>
}
