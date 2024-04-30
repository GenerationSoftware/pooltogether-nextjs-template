import { getPrizePoolId } from '@generationsoftware/hyperstructure-client-js'
import {
  useAllPrizeInfo,
  usePrizePool,
  usePrizeTokenPrice
} from '@generationsoftware/hyperstructure-react-hooks'
import classNames from 'classnames'
import Image from 'next/image'
import { useMemo } from 'react'
import { formatUnits } from 'viem'
import { PRIZE_POOL_INFO } from '@constants/config'
import { useEthPriceInUsd } from '@hooks/useEthPrice'
import { Loading } from './Loading'

interface GrandPrizeProps {
  className?: string
}

export const GrandPrize = (props: GrandPrizeProps) => {
  const { className } = props

  const prizePool = usePrizePool(
    PRIZE_POOL_INFO.chainId,
    PRIZE_POOL_INFO.address,
    PRIZE_POOL_INFO.options
  )

  const { data: allPrizeInfo } = useAllPrizeInfo([prizePool])

  const { data: prizeToken } = usePrizeTokenPrice(prizePool)

  const tokenAmount = useMemo(() => {
    const prizePoolId = getPrizePoolId(PRIZE_POOL_INFO.chainId, PRIZE_POOL_INFO.address)
    const rawTokenAmount = allPrizeInfo[prizePoolId]?.[0].amount.current

    if (!!prizeToken && !!rawTokenAmount) {
      return parseFloat(formatUnits(rawTokenAmount, prizeToken.decimals))
    }
  }, [allPrizeInfo, prizeToken])

  return (
    <div className={classNames('flex flex-col gap-1 items-center', className)}>
      <span className='text-2xl text-pt-purple-300'>The grand prize is currently at...</span>
      <PrizeTokenAmount amount={tokenAmount} className='h-16 text-6xl' />
      <PrizeUsdAmount
        amount={tokenAmount}
        price={prizeToken?.price}
        className='h-8 text-2xl text-pt-purple-300'
      />
    </div>
  )
}

const PrizeTokenAmount = (props: { amount?: number; className?: string }) => {
  const { amount, className } = props

  return (
    <span className={classNames('flex gap-2 items-center', className)}>
      {amount !== undefined ? (
        <>
          <Image src='ethLogo.svg' alt='Prize Token' width={28} height={28} />{' '}
          {amount.toLocaleString('en', { maximumFractionDigits: 2 })}
        </>
      ) : (
        <Loading className='h-4' />
      )}
    </span>
  )
}

const PrizeUsdAmount = (props: { amount?: number; price?: number; className?: string }) => {
  const { amount, price, className } = props

  const { data: ethPriceInUsd } = useEthPriceInUsd()

  const usdAmount = useMemo(() => {
    if (amount !== undefined && price !== undefined && ethPriceInUsd !== undefined) {
      return amount * price * ethPriceInUsd
    }
  }, [amount, price, ethPriceInUsd])

  return (
    <span className={className}>
      {usdAmount !== undefined &&
        `(~$${usdAmount.toLocaleString('en', { maximumFractionDigits: 0 })})`}
    </span>
  )
}
