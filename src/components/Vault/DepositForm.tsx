import { Vault } from '@generationsoftware/hyperstructure-client-js'
import { useTokenBalance, useVaultTokenData } from '@generationsoftware/hyperstructure-react-hooks'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { Address, formatUnits, parseUnits } from 'viem'
import { useAccount } from 'wagmi'
import { Loading } from '@components/Loading'
import { formatTokenAmount } from '@utils/formatting'
import { VaultDepositButton } from './DepositButton'

interface VaultDepositFormProps {
  vault: Vault
  className?: string
}

export const VaultDepositForm = (props: VaultDepositFormProps) => {
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
