export const siteUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://quikres.vercel.app'

export const siteData: {
  title: string
  description: string
  url: string
  ogImage: string
  twitterImage: string
  socialHandle: string
} = {
  title: 'QuikRes',
  description: 'A simple resume builder for everyone!',
  url: siteUrl,
  ogImage: `${siteUrl}/opengraph-image.png`,
  twitterImage: `${siteUrl}/twitter-image.png`,
  socialHandle: '@eg__xo',
}
