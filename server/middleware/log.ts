import { clipsQuery } from '~/server/utils/queryParser'

export default defineEventHandler((event) => {
  const { method, url } = event.node.req

  if (!(method === 'GET' && url?.startsWith('/api/clips')))
    return

  const userAgent = getRequestHeader(event, 'user-agent')
  const ipAddresses = event.node.req.headers['x-forwarded-for'] || event.node.req.socket.remoteAddress

  const ipAddress = Array.isArray(ipAddresses) ? ipAddresses[0] : ipAddresses?.split(',')[0]

  const { query, page } = clipsQuery(event)

  if (page === '1') {
    console.log('userAgent:', userAgent)
    console.log('ip:', ipAddress)
    console.log('query:', query)
  }
})
