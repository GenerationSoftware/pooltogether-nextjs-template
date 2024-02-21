import { ConnectButton } from '@rainbow-me/rainbowkit'
import classNames from 'classnames'
import Image from 'next/image'

interface NavbarProps {
  className?: string
}

export const Navbar = (props: NavbarProps) => {
  const { className } = props

  return (
    <nav
      className={classNames(
        'w-full flex justify-center p-4 bg-inherit',
        'border-b-2 border-b-pt-purple-700 shadow-2xl',
        className
      )}
    >
      <div className='w-full max-w-screen-xl flex items-center justify-between'>
        <Image
          src='pooltogetherLogo.svg'
          alt='PoolTogether Logo'
          width={133}
          height={52}
          priority={true}
        />
        <ConnectButton
          showBalance={false}
          chainStatus={{ smallScreen: 'icon', largeScreen: 'full' }}
          accountStatus='full'
        />
      </div>
    </nav>
  )
}
