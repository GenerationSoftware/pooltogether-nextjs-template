import { DeepPartial } from '@generationsoftware/hyperstructure-client-js'
import { darkTheme, Theme } from '@rainbow-me/rainbowkit'

export const getRainbowKitTheme = (): Theme => {
  const theme: Theme = darkTheme()

  const ptTheme: DeepPartial<Theme> = {
    colors: {
      accentColor: '#8050E3',
      connectButtonBackground: 'transparent',
      connectButtonText: '#F5F0FF'
    },
    shadows: {
      connectButton: '0 0 0 transparent'
    }
  }

  Object.assign(theme.colors, ptTheme.colors)
  Object.assign(theme.fonts, ptTheme.fonts)
  Object.assign(theme.shadows, ptTheme.shadows)

  return theme
}
