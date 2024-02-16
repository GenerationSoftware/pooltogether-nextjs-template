import { PRIZE_POOL_INFO } from '@/constants/config'
import { getPrizePoolId } from '@generationsoftware/hyperstructure-client-js'
import {
  useAllPrizeInfo,
  usePrizePool,
  usePrizeTokenData
} from '@generationsoftware/hyperstructure-react-hooks'
import classNames from 'classnames'
import Image from 'next/image'
import { useMemo } from 'react'
import { formatUnits } from 'viem'

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

  const { data: prizeToken } = usePrizeTokenData(prizePool)

  const tokenAmount = useMemo(() => {
    const prizePoolId = getPrizePoolId(PRIZE_POOL_INFO.chainId, PRIZE_POOL_INFO.address)
    const rawTokenAmount = allPrizeInfo[prizePoolId]?.[0].amount.current

    if (!!prizeToken && !!rawTokenAmount) {
      return formatUnits(rawTokenAmount, prizeToken.decimals)
    }
  }, [allPrizeInfo, prizeToken])

  return (
    <span className={classNames('', className)}>
      Grand Prize: <Image src='poolToken.svg' alt='Prize Token' width={24} height={24} />{' '}
      {tokenAmount}
    </span>
  )
}
