import { Vault } from '@generationsoftware/hyperstructure-client-js'
import { useUserVaultTokenBalance } from '@generationsoftware/hyperstructure-react-hooks'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { Address, formatUnits, parseUnits } from 'viem'
import { useAccount } from 'wagmi'
import { Loading } from '@components/Loading'
import { formatTokenAmount } from '@utils/formatting'
import { VaultWithdrawButton } from './WithdrawButton'

interface VaultWithdrawFormProps {
  vault: Vault
  className?: string
}

export const VaultWithdrawForm = (props: VaultWithdrawFormProps) => {
  const { vault, className } = props

  const { address: userAddress } = useAccount()

  const { data: token, isFetched: isFetchedUserVaultTokenBalance } = useUserVaultTokenBalance(
    vault,
    userAddress as Address
  )

  const userBalance = isFetchedUserVaultTokenBalance ? token?.amount : undefined

  const { register, formState, setValue, watch, resetField } = useForm<{ tokenAmount: string }>({
    mode: 'onChange',
    defaultValues: { tokenAmount: '' }
  })

  const formTokenAmount = watch('tokenAmount')

  if (!token) {
    return <></>
  }

  const withdrawAmount =
    !!formTokenAmount && formState.isValid ? parseUnits(formTokenAmount, token.decimals) : 0n
  const errorMsg = formState.errors['tokenAmount']?.message

  return (
    <div className={classNames('flex flex-col gap-1', className)}>
      <div className='flex gap-1 items-center justify-between'>
        <span>Withdraw {token.symbol}</span>
        {userBalance !== undefined ? (
          <button
            onClick={() => setValue('tokenAmount', formatUnits(userBalance, token.decimals))}
            className='text-sm text-pt-purple-100 hover:text-pt-purple-200'
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
                userBalance === undefined ||
                parseFloat(formatUnits(userBalance, token.decimals)) >= parseFloat(v) ||
                `Not enough ${token.symbol} in vault`
            }
          })}
          className='grow px-2 py-0.5 bg-pt-purple-50 text-pt-purple-900 rounded-l'
        />
        <VaultWithdrawButton
          vault={vault}
          withdrawAmount={withdrawAmount}
          onSuccess={() => resetField('tokenAmount')}
          className='rounded-l-none'
        />
      </div>
      <span className='h-4 text-xs text-pt-warning-light'>{errorMsg}</span>
    </div>
  )
}
