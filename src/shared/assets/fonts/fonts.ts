import localFont from 'next/font/local'

const SFPro = localFont({
  src: [
    {
      path: './SFProText-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './SFProText-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './SFProText-Heavy.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './SFProText-Bold.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-sfpro',
})

export {
  SFPro,
}
