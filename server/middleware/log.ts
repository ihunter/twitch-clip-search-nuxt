import { clipsQuery } from '~/server/utils/queryParser'

export default defineEventHandler((event) => {
  const userAgent = getRequestHeader(event, 'user-agent')
  const ipAddresses = event.node.req.headers['x-forwarded-for'] || event.node.req.socket.remoteAddress

  const ipAddress = Array.isArray(ipAddresses) ? ipAddresses[0] : ipAddresses?.split(',')[0]

  const { query } = clipsQuery(event)

  console.log('userAgent:', userAgent)
  console.log('ip:', ipAddress)
  console.log('query:', query)
})
