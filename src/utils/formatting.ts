import { formatUnits } from 'viem'

export const formatTokenAmount = (
  amount: bigint,
  decimals: number,
  options?: Intl.NumberFormatOptions
) => {
  const tokenAmount = parseFloat(formatUnits(amount, decimals))

  return tokenAmount.toLocaleString('en', {
    maximumFractionDigits: tokenAmount > 1_000 ? 0 : tokenAmount < 0 ? 4 : 2,
    ...options
  })
}
